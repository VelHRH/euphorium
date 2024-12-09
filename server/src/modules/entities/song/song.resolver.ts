import { Query, Resolver } from '@nestjs/graphql';
import { ZodArgs } from 'nestjs-graphql-zod';
import { GetSongInput, getSongInputSchema } from 'shared';

import { GetSongOutputDto } from './dto';
import { SongEntity } from './song.entity';
import { SongService } from './song.service';

@Resolver(() => SongEntity)
export class SongResolver {
  constructor(private readonly songService: SongService) {}

  @Query(() => GetSongOutputDto)
  song(
    @ZodArgs(getSongInputSchema, 'input') input: GetSongInput,
  ): GetSongOutputDto {
    return this.songService.get(input);
  }
}
