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

import { BadRequestException, NotFoundException } from '$exceptions';
import { PaginationService } from '$modules/pagination/pagination.service';
import { EventReviewEntity } from './event-review.entity';
import { LocalizedEntityService } from '$i18n/base/entity-i18n.service';
import { I18nService } from 'nestjs-i18n';
import { EventI18nKey } from '$i18n/keys/event';

@Injectable()
export class EventReviewService extends LocalizedEntityService {
  constructor(
    @InjectRepository(EventReviewEntity)
    private readonly eventReviewRepository: Repository<EventReviewEntity>,
    private readonly paginationService: PaginationService,
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
  ): Promise<Either<BadRequestException, CreateEventReviewOutput>> {
    try {
      const { eventInstanceId, ...reviewData } = input;
      const savedEventReview = await this.eventReviewRepository.save({
        ...reviewData,
        eventInstance: { id: eventInstanceId },
        commentEmbedding: [],
      });

      return right(savedEventReview);
    } catch (error) {
      console.error(error);
      return left(this.cannotCreate());
    }
  }

  async list(
    input: PaginationInput,
  ): Promise<Either<BadRequestException, ListEventReviewsOutput>> {
    try {
      const eventReviews = await this.eventReviewRepository.find();

      return right(
        this.paginationService.paginate({ items: eventReviews, ...input }),
      );
    } catch (error) {
      console.error(error);
      return left(this.notFound());
    }
  }
}
