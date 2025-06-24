import { Resolver } from '@nestjs/graphql';
import { QueryWithZod } from 'nestjs-graphql-zod';
import {
  GetSongInput,
  getSongInputSchema,
  GetSongOutput,
  getSongOutputSchema,
} from 'shared';

import { SongEntity } from './song.entity';
import { SongService } from './song.service';

import { CommonService } from '$modules/common/common.service';
import { GqlInputSchema } from '$modules/graphql/graphql-input-schema.decorator';

@Resolver(() => SongEntity)
export class SongResolver {
  constructor(
    private readonly songService: SongService,
    private readonly commonService: CommonService,
  ) {}

  @QueryWithZod(getSongOutputSchema)
  async song(
    @GqlInputSchema(getSongInputSchema) input: GetSongInput,
  ): Promise<GetSongOutput> {
    const result = await this.songService.get(input);

    return this.commonService.handleEitherResponse(result);
  }
}
