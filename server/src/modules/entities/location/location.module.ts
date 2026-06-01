import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationService } from '$modules/pagination/pagination.service';
import { LocationEntity } from './location.entity';
import { LocationService } from './location.service';
import { LocationResolver } from './location.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity])],
  providers: [LocationResolver, LocationService, PaginationService],
  exports: [LocationService],
})
export class LocationModule {}
