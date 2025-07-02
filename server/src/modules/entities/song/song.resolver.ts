import { Resolver } from '@nestjs/graphql';
import { handleEitherResponse } from 'common/helpers';
import {
  GetSongInput,
  getSongInputSchema,
  GetSongOutput,
  getSongOutputSchema,
} from 'shared';

import { SongEntity } from './song.entity';
import { SongService } from './song.service';

import { InputSchema, QueryOutputSchema } from '$lib/nestjs-graphql-zod';

@Resolver(() => SongEntity)
export class SongResolver {
  constructor(private readonly songService: SongService) {}

  @QueryOutputSchema(getSongOutputSchema)
  async song(
    @InputSchema(getSongInputSchema) input: GetSongInput,
  ): Promise<GetSongOutput> {
    return this.songService.get(input).then(handleEitherResponse);
  }
}
