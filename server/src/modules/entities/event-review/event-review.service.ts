import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import {
  CreateEventReviewInput,
  CreateEventReviewOutput,
  GetEventReviewInput,
  GetEventReviewOutput,
  ListEventReviewsOutput,
  PaginationInput,
} from 'shared';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';

import {
  BadRequestException,
  InternalServerException,
  NotFoundException,
} from '$exceptions';
import { PaginationService } from '$modules/pagination/pagination.service';
import { EventReviewEntity } from './event-review.entity';
import { LocalizedEntityService } from '$i18n/base/entity-i18n.service';
import { I18nService } from 'nestjs-i18n';
import { EventI18nKey } from '$i18n/keys/event';
import { EmbeddingService } from '$modules/embedding/embedding.service';

@Injectable()
export class EventReviewService extends LocalizedEntityService {
  private readonly relations = [
    'eventInstance',
    'eventInstance.event',
    'eventInstance.location',
    'eventInstance.location.city',
  ] as const;

  constructor(
    @InjectRepository(EventReviewEntity)
    private readonly eventReviewRepository: Repository<EventReviewEntity>,
    private readonly paginationService: PaginationService,
    private readonly embeddingService: EmbeddingService,
    i18n: I18nService,
  ) {
    super(i18n);
  }

  protected localizedEntityKey(): string {
    return EventI18nKey.EVENT_REVIEW;
  }

  async findOne(
    where: FindOptionsWhere<EventReviewEntity>,
    select?: FindOptionsSelect<EventReviewEntity>,
  ): Promise<Either<NotFoundException, EventReviewEntity>> {
    const eventReview = await this.eventReviewRepository.findOne({
      where,
      select,
      relations: [...this.relations],
    });

    if (!eventReview) {
      return left(this.notFound());
    }

    return right(eventReview);
  }

  get(
    input: GetEventReviewInput,
  ): Promise<Either<NotFoundException, GetEventReviewOutput>> {
    return this.findOne({ id: input.id });
  }

  async create(
    input: CreateEventReviewInput,
  ): Promise<
    Either<
      BadRequestException | InternalServerException,
      CreateEventReviewOutput
    >
  > {
    const { eventInstanceId, ...reviewData } = input;

    const embeddingResult = await this.embeddingService.embed(
      reviewData.comment,
    );

    if (embeddingResult.isLeft()) {
      return left(embeddingResult.value);
    }

    try {
      const savedEventReview = await this.eventReviewRepository.save({
        ...reviewData,
        eventInstance: { id: eventInstanceId },
        commentEmbedding: embeddingResult.value,
      });

      const eventReview = await this.eventReviewRepository.findOne({
        where: { id: savedEventReview.id },
        relations: [...this.relations],
      });

      if (!eventReview) {
        return left(this.cannotCreate());
      }

      return right(eventReview);
    } catch (error) {
      console.error(error);
      return left(this.cannotCreate());
    }
  }

  async getEventReviews(
    eventId: string,
    limit: number = 5,
  ): Promise<Either<NotFoundException, EventReviewEntity[]>> {
    const eventReviewsResult = await this.getEventReviewsByEventIds(
      [eventId],
      limit,
    );

    if (eventReviewsResult.isLeft()) {
      return left(eventReviewsResult.value);
    }

    return right(
      (eventReviewsResult.value.get(eventId) ?? []) as EventReviewEntity[],
    );
  }

  async getEventReviewsByEventIds(
    eventIds: string[],
    limit: number = 5,
  ): Promise<
    Either<
      NotFoundException,
      Map<string, Pick<EventReviewEntity, 'comment' | 'rating'>[]>
    >
  > {
    if (!eventIds.length) {
      return right(new Map());
    }

    try {
      const rows = await this.eventReviewRepository
        .createQueryBuilder('review')
        .innerJoin('review.eventInstance', 'instance')
        .innerJoin('instance.event', 'event')
        .select('review.comment', 'comment')
        .addSelect('review.rating', 'rating')
        .addSelect('event.id', 'eventId')
        .where('event.id IN (:...eventIds)', { eventIds })
        .getRawMany<{ comment: string; rating: number; eventId: string }>();

      const reviewsByEventId = new Map<
        string,
        Pick<EventReviewEntity, 'comment' | 'rating'>[]
      >(eventIds.map((eventId) => [eventId, []]));

      for (const row of rows) {
        const reviews = reviewsByEventId.get(row.eventId);

        if (!reviews || reviews.length >= limit) {
          continue;
        }

        reviews.push({ comment: row.comment, rating: row.rating });
      }

      return right(reviewsByEventId);
    } catch (error) {
      console.error(error);
      return left(this.notFound());
    }
  }

  async list(
    input: PaginationInput,
  ): Promise<Either<BadRequestException, ListEventReviewsOutput>> {
    try {
      const eventReviews = await this.eventReviewRepository.find({
        relations: [...this.relations],
      });

      return right(
        this.paginationService.paginate({ items: eventReviews, ...input }),
      );
    } catch (error) {
      console.error(error);
      return left(this.notFound());
    }
  }
}
