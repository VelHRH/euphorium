import { Injectable } from '@nestjs/common';

import { GetSongInputDto, GetSongOutputDto } from './dto';

@Injectable()
export class SongService {
  get(input: GetSongInputDto): GetSongOutputDto {
    return { name: input.id.toString() };
  }
}
