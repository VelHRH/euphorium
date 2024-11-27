import { Injectable } from '@nestjs/common';

import { GetSongOutputDto } from './dto';

@Injectable()
export class SongService {
  get(): GetSongOutputDto {
    return { name: 'Satellite'.split('').reverse().join('') };
  }
}
