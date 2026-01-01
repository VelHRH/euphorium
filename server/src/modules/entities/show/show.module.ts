import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowEntity } from './show.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShowEntity])],
  providers: [],
})
export class ShowModule {}
