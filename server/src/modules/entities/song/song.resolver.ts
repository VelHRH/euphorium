import { Resolver } from '@nestjs/graphql';
import {
  GetSongInput,
  getSongInputSchema,
  GetSongResponse,
  getSongResponseSchema,
} from 'shared';

import { SongEntity } from './song.entity';
import { SongService } from './song.service';

import { handleEitherResponse } from '$helpers';
import {
  InputSchema,
  QueryOutputSchema,
} from '$modules/graphql/graphql-schema.decorator';

@Resolver(() => SongEntity)
export class SongResolver {
  constructor(private readonly songService: SongService) {}

  @QueryOutputSchema(getSongResponseSchema)
  async song(
    @InputSchema(getSongInputSchema) input: GetSongInput,
  ): Promise<GetSongResponse> {
    return this.songService.get(input).then(handleEitherResponse);
  }
}
