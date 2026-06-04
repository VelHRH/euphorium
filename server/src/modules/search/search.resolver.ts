import { Resolver } from '@nestjs/graphql';
import {
  SearchEventsOutput,
  searchEventsOutputSchema,
  SearchInput,
  searchInputSchema,
} from 'shared';

import { handleEitherResponse } from '$helpers';
import { InputSchema, QueryOutputSchema } from '$lib/nestjs-graphql-zod';
import { SearchService } from './search.service';

@Resolver()
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @QueryOutputSchema(searchEventsOutputSchema)
  async searchEvents(
    @InputSchema(searchInputSchema) input: SearchInput,
  ): Promise<SearchEventsOutput> {
    return this.searchService
      .searchSimilarEvents(input.query, input.limit)
      .then(handleEitherResponse);
  }
}
