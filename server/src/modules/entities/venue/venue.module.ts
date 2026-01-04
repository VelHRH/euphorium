import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueEntity } from './venue.entity';
import { VenueResolver } from './venue.resolver';
import { VenueService } from './venue.service';
import { PaginationService } from '$modules/pagination/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([VenueEntity])],
  providers: [VenueResolver, VenueService, PaginationService],
  exports: [VenueService],
})
export class VenueModule {}
