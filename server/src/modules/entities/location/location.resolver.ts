import { Resolver } from '@nestjs/graphql';
import {
  CreateLocationInput,
  createLocationInputSchema,
  CreateLocationOutput,
  createLocationOutputSchema,
  GetLocationInput,
  getLocationInputSchema,
  GetLocationOutput,
  getLocationOutputSchema,
  ListLocationsOutput,
  listLocationsOutputSchema,
  PaginationInput,
  paginationInputSchema,
} from 'shared';

import { handleEitherResponse } from '$helpers';
import {
  InputSchema,
  MutationOutputSchema,
  QueryOutputSchema,
} from '$lib/nestjs-graphql-zod';
import { LocationEntity } from './location.entity';
import { LocationService } from './location.service';

@Resolver(() => LocationEntity)
export class LocationResolver {
  constructor(private readonly service: LocationService) {}

  @QueryOutputSchema(getLocationOutputSchema)
  async location(
    @InputSchema(getLocationInputSchema) input: GetLocationInput,
  ): Promise<GetLocationOutput> {
    return this.service.get(input).then(handleEitherResponse);
  }

  @MutationOutputSchema(createLocationOutputSchema)
  async createLocation(
    @InputSchema(createLocationInputSchema) input: CreateLocationInput,
  ): Promise<CreateLocationOutput> {
    return this.service.create(input).then(handleEitherResponse);
  }

  @QueryOutputSchema(listLocationsOutputSchema)
  async locations(
    @InputSchema(paginationInputSchema) input: PaginationInput,
  ): Promise<ListLocationsOutput> {
    return this.service.list(input).then(handleEitherResponse);
  }
}
