import { Resolver } from '@nestjs/graphql';
import {
  CreateEventInstanceOutput,
  CreateEventInstanceInput,
  createEventInstanceInputSchema,
  GetEventInstanceInput,
  getEventInstanceInputSchema,
  GetEventInstanceOutput,
  getEventInstanceOutputSchema,
  PaginationInput,
  paginationInputSchema,
  createEventInstanceOutputSchema,
  listEventInstancesOutputSchema,
  ListEventInstancesOutput,
} from 'shared';

import { handleEitherResponse } from '$helpers';
import {
  InputSchema,
  MutationOutputSchema,
  QueryOutputSchema,
} from '$lib/nestjs-graphql-zod';
import { EventInstanceService } from './event-instance.service';
import { EventInstanceEntity } from './event-instance.entity';

@Resolver(() => EventInstanceEntity)
export class EventInstanceResolver {
  constructor(private readonly service: EventInstanceService) {}

  @QueryOutputSchema(getEventInstanceOutputSchema)
  async eventInstance(
    @InputSchema(getEventInstanceInputSchema) input: GetEventInstanceInput,
  ): Promise<GetEventInstanceOutput> {
    return this.service.get(input).then(handleEitherResponse);
  }

  @MutationOutputSchema(createEventInstanceOutputSchema)
  async createEventInstance(
    @InputSchema(createEventInstanceInputSchema)
    input: CreateEventInstanceInput,
  ): Promise<CreateEventInstanceOutput> {
    return this.service.create(input).then(handleEitherResponse);
  }

  @QueryOutputSchema(listEventInstancesOutputSchema)
  async eventInstances(
    @InputSchema(paginationInputSchema) input: PaginationInput,
  ): Promise<ListEventInstancesOutput> {
    return this.service.list(input).then(handleEitherResponse);
  }
}
