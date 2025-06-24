import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SongEntity } from './song.entity';
import { SongResolver } from './song.resolver';
import { SongService } from './song.service';

import { CommonModule } from '$modules/common/common.module';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([SongEntity])],
  providers: [SongService, SongResolver],
})
export class SongModule {}
