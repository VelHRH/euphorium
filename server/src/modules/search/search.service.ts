import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import { Repository } from 'typeorm';

import { InternalServerException } from '$exceptions';
import { EmbeddingService } from '$modules/embedding/embedding.service';
import { EventEntity } from '$modules/entities/event/event.entity';
import { EventRagService } from '$modules/entities/event/event-rag.service';
import { SearchEventOutput, SearchEventsOutput } from 'shared';
import { EventReviewService } from '$modules/entities/event-review/event-review.service';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    private readonly embeddingService: EmbeddingService,
    private readonly eventRagService: EventRagService,
    private readonly eventReviewService: EventReviewService,
  ) {}

  async searchEvents(
    query: string,
    limit: number = 5,
  ): Promise<Either<InternalServerException, SearchEventsOutput>> {
    const embeddingResult = await this.embeddingService.embed(query);

    if (embeddingResult.isLeft()) {
      return left(embeddingResult.value);
    }

    const queryEmbedding = embeddingResult.value;

    const similarityLimit = limit * 2;

    try {
      const [byDescription, byReviews] = await Promise.all([
        this.searchSimilarEventsByDescription(queryEmbedding, similarityLimit),
        this.searchSimilarEventsByReviews(queryEmbedding, similarityLimit),
      ]);

      const eventIds = [
        ...new Set([
          ...byDescription.map((e) => e.item.id),
          ...byReviews.map((e) => e.item.id),
        ]),
      ];

      const eventReviewsResult =
        await this.eventReviewService.getEventReviewsByEventIds(eventIds);

      if (eventReviewsResult.isLeft()) {
        return left(
          new InternalServerException(
            'Search service is temporarily unavailable',
          ),
        );
      }

      const eventsReviews = eventReviewsResult.value;

      const rankingResult = await this.eventRagService.rankEvents(
        query,
        {
          byDescription: byDescription.map((e) => ({
            ...e,
            reviews: eventsReviews.get(e.item.id) ?? [],
          })),
          byReviews: byReviews.map((e) => ({
            ...e,
            reviews: eventsReviews.get(e.item.id) ?? [],
          })),
        },
        limit,
      );

      if (rankingResult.isLeft()) {
        return left(rankingResult.value);
      }

      return right({ events: rankingResult.value });
    } catch (error) {
      console.error('Vector search failed:', error);
      return left(
        new InternalServerException(
          'Search service is temporarily unavailable',
        ),
      );
    }
  }

  private async searchSimilarEventsByDescription(
    queryEmbedding: number[],
    limit: number,
  ): Promise<SearchEventOutput[]> {
    const results = await this.eventRepository
      .createQueryBuilder('event')
      .select([
        'event.id',
        'event.name',
        'event.description',
        'event.createdAt',
        'event.updatedAt',
      ])
      .addSelect(
        `1 - (event.description_embedding <=> CAST(:queryEmbedding AS vector))`,
        'similarity',
      )
      .where('event.description_embedding IS NOT NULL')
      .setParameter('queryEmbedding', this.toVectorParam(queryEmbedding))
      .orderBy(
        'event.description_embedding <=> CAST(:queryEmbedding AS vector)',
        'ASC',
      )
      .limit(limit)
      .getRawAndEntities();

    return this.mapSearchResults(results);
  }

  private async searchSimilarEventsByReviews(
    queryEmbedding: number[],
    limit: number,
  ): Promise<SearchEventOutput[]> {
    const reviewSimilarityExpr = `MAX(1 - (review.comment_embedding <=> CAST(:queryEmbedding AS vector)))`;

    const results = await this.eventRepository
      .createQueryBuilder('event')
      .innerJoin('event.instances', 'instance')
      .innerJoin('instance.reviews', 'review')
      .select([
        'event.id',
        'event.name',
        'event.description',
        'event.createdAt',
        'event.updatedAt',
      ])
      .addSelect(reviewSimilarityExpr, 'similarity')
      .where('review.comment_embedding IS NOT NULL')
      .groupBy('event.id')
      .addGroupBy('event.name')
      .addGroupBy('event.description')
      .addGroupBy('event.createdAt')
      .addGroupBy('event.updatedAt')
      .setParameter('queryEmbedding', this.toVectorParam(queryEmbedding))
      .orderBy(reviewSimilarityExpr, 'DESC')
      .limit(limit)
      .getRawAndEntities();

    return this.mapSearchResults(results);
  }

  private mapSearchResults(results: {
    entities: EventEntity[];
    raw: Pick<SearchEventOutput, 'similarity'>[];
  }): SearchEventOutput[] {
    return results.entities.map((event, index) => ({
      item: event,
      similarity: Number(results.raw[index].similarity) || 0,
    }));
  }

  private toVectorParam(embedding: number[]): string {
    return `[${embedding.join(',')}]`;
  }
}
