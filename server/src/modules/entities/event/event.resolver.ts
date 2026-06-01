import { Resolver } from '@nestjs/graphql';
import {
  CreateEventInput,
  createEventInputSchema,
  CreateEventOutput,
  createEventOutputSchema,
  GetEventInput,
  GetEventOutput,
  getEventOutputSchema,
  ListEventsOutput,
  listEventsOutputSchema,
  PaginationInput,
  paginationInputSchema,
} from 'shared';

import { handleEitherResponse } from '$helpers';
import {
  InputSchema,
  MutationOutputSchema,
  QueryOutputSchema,
} from '$lib/nestjs-graphql-zod';
import { EventEntity } from './event.entity';
import { EventService } from './event.service';

@Resolver(() => EventEntity)
export class EventResolver {
  constructor(private readonly service: EventService) {}

  @QueryOutputSchema(getEventOutputSchema)
  async event(
    @InputSchema(getEventOutputSchema) input: GetEventInput,
  ): Promise<GetEventOutput> {
    return this.service.get(input).then(handleEitherResponse);
  }

  @MutationOutputSchema(createEventOutputSchema)
  async createEvent(
    @InputSchema(createEventInputSchema) input: CreateEventInput,
  ): Promise<CreateEventOutput> {
    return this.service.create(input).then(handleEitherResponse);
  }

  @QueryOutputSchema(listEventsOutputSchema)
  async events(
    @InputSchema(paginationInputSchema) input: PaginationInput,
  ): Promise<ListEventsOutput> {
    return this.service.list(input).then(handleEitherResponse);
  }
}
