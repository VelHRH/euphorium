import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CryptoModule } from '$modules/crypto/crypto.module';
import { SongWriterEntity } from './song-writer.entity';

@Module({
  imports: [CryptoModule, TypeOrmModule.forFeature([SongWriterEntity])],
})
export class SongWriterModule {}
