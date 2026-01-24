import { Resolver } from '@nestjs/graphql';
import {
  CreateCityInput,
  createCityInputSchema,
  CreateCityOutput,
  createCityOutputSchema,
  CreateVenueInput,
  createVenueInputSchema,
  CreateVenueOutput,
  createVenueOutputSchema,
  GetCityInput,
  getCityInputSchema,
  GetCityOutput,
  getCityOutputSchema,
  ListCitiesOutput,
  listCitiesOutputSchema,
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
import { CityEntity } from './city.entity';
import { CityService } from './city.service';

@Resolver(() => CityEntity)
export class CityResolver {
  constructor(private readonly service: CityService) {}

  @QueryOutputSchema(getCityOutputSchema)
  async city(
    @InputSchema(getCityInputSchema) input: GetCityInput,
  ): Promise<GetCityOutput> {
    return this.service.get(input).then(handleEitherResponse);
  }

  @MutationOutputSchema(createCityOutputSchema)
  async createCity(
    @InputSchema(createCityInputSchema) input: CreateCityInput,
  ): Promise<CreateCityOutput> {
    return this.service.create(input).then(handleEitherResponse);
  }

  @QueryOutputSchema(listCitiesOutputSchema)
  async cities(
    @InputSchema(paginationInputSchema) input: PaginationInput,
  ): Promise<ListCitiesOutput> {
    return this.service.list(input).then(handleEitherResponse);
  }
}
