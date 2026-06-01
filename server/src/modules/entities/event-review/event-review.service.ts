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
import { EventReviewExceptionMessage } from './event-review.exceptions';

@Injectable()
export class EventReviewService {
  constructor(
    @InjectRepository(EventReviewEntity)
    private readonly eventReviewRepository: Repository<EventReviewEntity>,
    private readonly paginationService: PaginationService,
  ) {}

  async findOne(
    where: FindOptionsWhere<EventReviewEntity>,
    select?: FindOptionsSelect<EventReviewEntity>,
  ): Promise<Either<NotFoundException, EventReviewEntity>> {
    const eventReview = await this.eventReviewRepository.findOne({
      where,
      select,
    });

    if (!eventReview) {
      return left(
        new NotFoundException(
          EventReviewExceptionMessage.EVENT_REVIEW_NOT_FOUND,
        ),
      );
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
      const savedEventReview = await this.eventReviewRepository.save(input);

      return right(savedEventReview);
    } catch (error) {
      console.error(error);
      return left(
        new BadRequestException(
          EventReviewExceptionMessage.CANNOT_CREATE_EVENT_REVIEW,
        ),
      );
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
      return left(
        new BadRequestException(
          EventReviewExceptionMessage.EVENT_REVIEW_NOT_FOUND,
        ),
      );
    }
  }
}
