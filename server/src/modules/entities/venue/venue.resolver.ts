import { Resolver } from '@nestjs/graphql';
import {
  CreateVenueInput,
  createVenueInputSchema,
  CreateVenueOutput,
  createVenueOutputSchema,
  GetVenueInput,
  getVenueInputSchema,
  GetVenueOutput,
  getVenueOutputSchema,
  ListVenuesOutput,
  listVenuesOutputSchema,
  PaginationInput,
  paginationInputSchema,
} from 'shared';

import { handleEitherResponse } from '$helpers';
import {
  InputSchema,
  MutationOutputSchema,
  QueryOutputSchema,
} from '$lib/nestjs-graphql-zod';
import { VenueEntity } from './venue.entity';
import { VenueService } from './venue.service';

@Resolver(() => VenueEntity)
export class VenueResolver {
  constructor(private readonly service: VenueService) {}

  @QueryOutputSchema(getVenueOutputSchema)
  async venue(
    @InputSchema(getVenueInputSchema) input: GetVenueInput,
  ): Promise<GetVenueOutput> {
    return this.service.get(input).then(handleEitherResponse);
  }

  @MutationOutputSchema(createVenueOutputSchema)
  async createVenue(
    @InputSchema(createVenueInputSchema) input: CreateVenueInput,
  ): Promise<CreateVenueOutput> {
    return this.service.create(input).then(handleEitherResponse);
  }

  @QueryOutputSchema(listVenuesOutputSchema)
  async venues(
    @InputSchema(paginationInputSchema) input: PaginationInput,
  ): Promise<ListVenuesOutput> {
    return this.service.list(input).then(handleEitherResponse);
  }
}
