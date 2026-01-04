import { Resolver } from '@nestjs/graphql';
import {
  CreateShowInput,
  createShowInputSchema,
  CreateShowOutput,
  createShowOutputSchema,
  GetShowInput,
  getShowInputSchema,
  GetShowOutput,
  getShowOutputSchema,
  ListShowsOutput,
  listShowsOutputSchema,
  PaginationInput,
  paginationInputSchema,
} from 'shared';

import { handleEitherResponse } from '$helpers';
import {
  InputSchema,
  MutationOutputSchema,
  QueryOutputSchema,
} from '$lib/nestjs-graphql-zod';
import { ShowEntity } from './show.entity';
import { ShowService } from './show.service';

@Resolver(() => ShowEntity)
export class ShowResolver {
  constructor(private readonly service: ShowService) {}

  @QueryOutputSchema(getShowOutputSchema)
  async show(
    @InputSchema(getShowInputSchema) input: GetShowInput,
  ): Promise<GetShowOutput> {
    return this.service.get(input).then(handleEitherResponse);
  }

  @MutationOutputSchema(createShowOutputSchema)
  async createShow(
    @InputSchema(createShowInputSchema) input: CreateShowInput,
  ): Promise<CreateShowOutput> {
    return this.service.create(input).then(handleEitherResponse);
  }

  @QueryOutputSchema(listShowsOutputSchema)
  async listShows(
    @InputSchema(paginationInputSchema) input: PaginationInput,
  ): Promise<ListShowsOutput> {
    return this.service.list(input).then(handleEitherResponse);
  }
}
