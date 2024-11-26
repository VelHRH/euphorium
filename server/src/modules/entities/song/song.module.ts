import { Module } from '@nestjs/common';

import { SongResolver } from './song.resolver';
import { SongService } from './song.service';

@Module({
  providers: [SongService, SongResolver],
})
export class SongModule {}
