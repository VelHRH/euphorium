import { Resolver } from '@nestjs/graphql';
import {
  GetSongInput,
  getSongInputSchema,
  GetSongResponse,
  getSongResponseSchema,
} from 'shared';

import { SongEntity } from './song.entity';
import { SongService } from './song.service';

import { CommonService } from '$modules/common/common.service';
import {
  QueryInputSchema,
  QueryOutputSchema,
} from '$modules/graphql/graphql-query-schema.decorator';

@Resolver(() => SongEntity)
export class SongResolver {
  constructor(
    private readonly songService: SongService,
    private readonly commonService: CommonService,
  ) {}

  @QueryOutputSchema(getSongResponseSchema)
  async song(
    @QueryInputSchema(getSongInputSchema) input: GetSongInput,
  ): Promise<GetSongResponse> {
    return this.songService
      .get(input)
      .then(this.commonService.handleEitherResponse);
  }
}
