import { Args, Query, Resolver } from '@nestjs/graphql';

import { GetSongInputDto, GetSongOutputDto } from './dto';
import { SongEntity } from './song.entity';
import { SongService } from './song.service';

@Resolver(() => SongEntity)
export class SongResolver {
  constructor(private readonly songService: SongService) {}

  @Query(() => GetSongOutputDto)
  song(@Args('input') input: GetSongInputDto): GetSongOutputDto {
    return this.songService.get(input);
  }
}
