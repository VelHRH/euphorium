import { Resolver } from '@nestjs/graphql';
import {
  PaginationInput,
  paginationInputSchema,
  getEventReviewInputSchema,
  GetEventReviewInput,
  GetEventReviewOutput,
  getEventReviewOutputSchema,
  createEventReviewOutputSchema,
  createEventReviewInputSchema,
  CreateEventReviewInput,
  CreateEventReviewOutput,
  listEventReviewsOutputSchema,
  ListEventReviewsOutput,
} from 'shared';

import { handleEitherResponse } from '$helpers';
import {
  InputSchema,
  MutationOutputSchema,
  QueryOutputSchema,
} from '$lib/nestjs-graphql-zod';
import { EventReviewService } from './event-review.service';
import { EventReviewEntity } from './event-review.entity';

@Resolver(() => EventReviewEntity)
export class EventReviewResolver {
  constructor(private readonly service: EventReviewService) {}

  @QueryOutputSchema(getEventReviewOutputSchema)
  async eventReview(
    @InputSchema(getEventReviewInputSchema) input: GetEventReviewInput,
  ): Promise<GetEventReviewOutput> {
    return this.service.get(input).then(handleEitherResponse);
  }

  @MutationOutputSchema(createEventReviewOutputSchema)
  async createEventReview(
    @InputSchema(createEventReviewInputSchema)
    input: CreateEventReviewInput,
  ): Promise<CreateEventReviewOutput> {
    return this.service.create(input).then(handleEitherResponse);
  }

  @QueryOutputSchema(listEventReviewsOutputSchema)
  async eventReviews(
    @InputSchema(paginationInputSchema) input: PaginationInput,
  ): Promise<ListEventReviewsOutput> {
    return this.service.list(input).then(handleEitherResponse);
  }
}
