import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FestivalEntity } from './festival.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FestivalEntity])],
  providers: [],
})
export class FestivalModule {}
