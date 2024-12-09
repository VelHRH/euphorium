import { Injectable } from '@nestjs/common';
import { GetSongInput } from 'shared';

import { GetSongOutputDto } from './dto';

@Injectable()
export class SongService {
  get(input: GetSongInput): GetSongOutputDto {
    return { name: input.name };
  }
}
