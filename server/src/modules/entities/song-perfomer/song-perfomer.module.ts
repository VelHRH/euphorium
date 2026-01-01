import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CryptoModule } from '$modules/crypto/crypto.module';
import { SongPerformerEntity } from './song-perfomer.entity';

@Module({
  imports: [CryptoModule, TypeOrmModule.forFeature([SongPerformerEntity])],
})
export class SongPerformerModule {}
