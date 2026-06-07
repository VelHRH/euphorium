import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, right } from '@sweet-monads/either';
import { In, Repository } from 'typeorm';

import { InternalServerException } from '$exceptions';
import { EventReviewEntity } from '$modules/entities/event-review/event-review.entity';
import { LlmService } from '$modules/llm/llm.service';
import { SearchEventOutput } from 'shared';

const MAX_REVIEWS_PER_EVENT = 5;

type EventCandidate = {
  event: SearchEventOutput['item'];
  descriptionSimilarity: number | null;
  reviewSimilarity: number | null;
  reviews: { comment: string; rating: number }[];
};

type RankedEventIds = {
  eventIds: string[];
};

type EventsReviews = Map<
  string,
  Pick<EventReviewEntity, 'comment' | 'rating'>[]
>;

const RANKED_EVENT_IDS_SCHEMA = {
  type: 'object',
  properties: {
    eventIds: {
      type: 'array',
      items: { type: 'string' },
    },
  },
  required: ['eventIds'],
};

@Injectable()
export class EventRagService {
  constructor(
    @InjectRepository(EventReviewEntity)
    private readonly eventReviewRepository: Repository<EventReviewEntity>,
    private readonly llmService: LlmService,
  ) {}

  async rankEvents(
    query: string,
    retrievedEvents: {
      byDescription: SearchEventOutput[];
      byReviews: SearchEventOutput[];
      eventsReviews: EventsReviews;
    },
    limit: number,
  ): Promise<Either<InternalServerException, SearchEventOutput[]>> {
    const { byDescription, byReviews, eventsReviews } = retrievedEvents;
    const candidates = await this.buildCandidates(
      byDescription,
      byReviews,
      eventsReviews,
    );

    if (!candidates.size) {
      return right([]);
    }

    const llmResult = await this.llmService.generateJson<RankedEventIds>(
      this.buildPrompt(query, candidates, limit),
      RANKED_EVENT_IDS_SCHEMA,
    );

    if (llmResult.isLeft()) {
      return right(this.fallbackRanking(candidates, limit));
    }

    const ranked = this.mapRankedEventIds(
      llmResult.value.eventIds,
      candidates,
      limit,
    );

    if (ranked.length) {
      return right(ranked);
    }

    return right(this.fallbackRanking(candidates, limit));
  }

  private async buildCandidates(
    byDescription: SearchEventOutput[],
    byReviews: SearchEventOutput[],
    eventsReviews: EventsReviews,
  ): Promise<Map<string, EventCandidate>> {
    const candidates = new Map<string, EventCandidate>();

    for (const result of byDescription) {
      candidates.set(result.item.id, {
        event: result.item,
        descriptionSimilarity: result.similarity,
        reviewSimilarity: null,
        reviews: eventsReviews.get(result.item.id) ?? [],
      });
    }

    for (const result of byReviews) {
      const existing = candidates.get(result.item.id);

      if (existing) {
        existing.reviewSimilarity = result.similarity;
        continue;
      }

      candidates.set(result.item.id, {
        event: result.item,
        descriptionSimilarity: null,
        reviewSimilarity: result.similarity,
        reviews: [],
      });
    }

    await this.attachReviews(candidates);

    return candidates;
  }

  private async attachReviews(
    candidates: Map<string, EventCandidate>,
  ): Promise<void> {
    const eventIds = [...candidates.keys()];

    if (!eventIds.length) {
      return;
    }

    const reviews = await this.eventReviewRepository.find({
      where: { eventInstance: { event: { id: In(eventIds) } } },
      relations: { eventInstance: { event: true } },
      select: {
        comment: true,
        rating: true,
        eventInstance: { id: true, event: { id: true } },
      },
      order: { createdAt: 'DESC' },
    });

    const reviewsByEventId = new Map<
      string,
      Array<{ comment: string; rating: number }>
    >();

    for (const review of reviews) {
      const eventId = review.eventInstance.event.id;
      const eventReviews = reviewsByEventId.get(eventId) ?? [];

      if (eventReviews.length >= MAX_REVIEWS_PER_EVENT) {
        continue;
      }

      eventReviews.push({ comment: review.comment, rating: review.rating });
      reviewsByEventId.set(eventId, eventReviews);
    }

    for (const [eventId, eventReviews] of reviewsByEventId) {
      const candidate = candidates.get(eventId);

      if (candidate) {
        candidate.reviews = eventReviews;
      }
    }
  }

  private buildPrompt(
    query: string,
    candidates: Map<string, EventCandidate>,
    limit: number,
  ): string {
    const candidateBlocks = [...candidates.values()].map((candidate) => {
      const sources = [
        candidate.descriptionSimilarity !== null
          ? `description match (score: ${candidate.descriptionSimilarity.toFixed(3)})`
          : null,
        candidate.reviewSimilarity !== null
          ? `review match (score: ${candidate.reviewSimilarity.toFixed(3)})`
          : null,
      ]
        .filter(Boolean)
        .join(', ');

      const reviewsBlock = candidate.reviews.length
        ? candidate.reviews
            .map((review) => `- Rating ${review.rating}/5: "${review.comment}"`)
            .join('\n')
        : 'No reviews available.';

      return [
        `[ID: ${candidate.event.id}]`,
        `Name: ${candidate.event.name}`,
        `Description: ${candidate.event.description}`,
        `Retrieval sources: ${sources}`,
        `Reviews:\n${reviewsBlock}`,
      ].join('\n');
    });

    return [
      'Select the most relevant events for the user query using the candidate events below.',
      'Candidates were retrieved with vector search by event descriptions and user reviews.',
      'Prefer events that match the query intent across both description and reviews.',
      'Return only event IDs from the provided candidates, ordered by relevance (most relevant first).',
      `Select at most ${limit} events.`,
      '',
      `User query: "${query}"`,
      '',
      'Candidates:',
      candidateBlocks.join('\n\n'),
    ].join('\n');
  }

  private mapRankedEventIds(
    eventIds: string[],
    candidates: Map<string, EventCandidate>,
    limit: number,
  ): SearchEventOutput[] {
    const seen = new Set<string>();

    // Whitelist event ids to avoid duplicates and ensure we only return events that are candidates
    return eventIds
      .filter((eventId) => {
        if (seen.has(eventId) || !candidates.has(eventId)) {
          return false;
        }

        seen.add(eventId);

        return true;
      })
      .slice(0, limit)
      .map((eventId) => this.toSearchEventOutput(candidates.get(eventId)!));
  }

  // If llm fails, fallback to ranking by similarity from embeddings
  private fallbackRanking(
    candidates: Map<string, EventCandidate>,
    limit: number,
  ): SearchEventOutput[] {
    return [...candidates.values()]
      .sort(
        (leftCandidate, rightCandidate) =>
          this.bestSimilarity(rightCandidate) -
          this.bestSimilarity(leftCandidate),
      )
      .slice(0, limit)
      .map((candidate) => this.toSearchEventOutput(candidate));
  }

  private toSearchEventOutput(candidate: EventCandidate): SearchEventOutput {
    return {
      item: candidate.event,
      similarity: this.bestSimilarity(candidate),
    };
  }

  private bestSimilarity(candidate: EventCandidate): number {
    return Math.max(
      candidate.descriptionSimilarity ?? 0,
      candidate.reviewSimilarity ?? 0,
    );
  }
}
