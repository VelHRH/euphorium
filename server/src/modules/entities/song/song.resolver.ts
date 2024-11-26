import { Query, Resolver } from '@nestjs/graphql';

import { GetSongOutputDto } from './dto';
import { SongService } from './song.service';

@Resolver()
export class SongResolver {
  constructor(private readonly songService: SongService) {}

  @Query(() => GetSongOutputDto)
  song(): GetSongOutputDto {
    return this.songService.get();
  }
}
