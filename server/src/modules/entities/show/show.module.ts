import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowEntity } from './show.entity';
import { ShowService } from './show.service';
import { ShowResolver } from './show.resolver';
import { PaginationService } from '$modules/pagination/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShowEntity])],
  providers: [ShowResolver, ShowService, PaginationService],
  exports: [ShowService],
})
export class ShowModule {}
