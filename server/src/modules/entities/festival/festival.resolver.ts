import { Resolver } from '@nestjs/graphql';
import {
  CreateFestivalInput,
  createFestivalInputSchema,
  CreateFestivalOutput,
  createFestivalOutputSchema,
  GetFestivalInput,
  getFestivalInputSchema,
  GetFestivalOutput,
  getFestivalOutputSchema,
  ListFestivalsOutput,
  listFestivalsOutputSchema,
  PaginationInput,
  paginationInputSchema,
} from 'shared';

import { handleEitherResponse } from '$helpers';
import {
  InputSchema,
  MutationOutputSchema,
  QueryOutputSchema,
} from '$lib/nestjs-graphql-zod';
import { FestivalEntity } from './festival.entity';
import { FestivalService } from './festival.service';

@Resolver(() => FestivalEntity)
export class FestivalResolver {
  constructor(private readonly service: FestivalService) {}

  @QueryOutputSchema(getFestivalOutputSchema)
  async festival(
    @InputSchema(getFestivalInputSchema) input: GetFestivalInput,
  ): Promise<GetFestivalOutput> {
    return this.service.get(input).then(handleEitherResponse);
  }

  @MutationOutputSchema(createFestivalOutputSchema)
  async createFestival(
    @InputSchema(createFestivalInputSchema) input: CreateFestivalInput,
  ): Promise<CreateFestivalOutput> {
    return this.service.create(input).then(handleEitherResponse);
  }

  @QueryOutputSchema(listFestivalsOutputSchema)
  async festivals(
    @InputSchema(paginationInputSchema) input: PaginationInput,
  ): Promise<ListFestivalsOutput> {
    return this.service.list(input).then(handleEitherResponse);
  }
}
