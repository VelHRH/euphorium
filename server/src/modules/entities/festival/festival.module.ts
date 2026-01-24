import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FestivalEntity } from './festival.entity';
import { FestivalResolver } from './festival.resolver';
import { PaginationService } from '$modules/pagination/pagination.service';
import { FestivalService } from './festival.service';

@Module({
  imports: [TypeOrmModule.forFeature([FestivalEntity])],
  providers: [FestivalService, FestivalResolver, PaginationService],
  exports: [FestivalService],
})
export class FestivalModule {}
