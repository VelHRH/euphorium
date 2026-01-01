import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueEntity } from './venue.entity';
import { VenueResolver } from './venue.resolver';
import { VenueService } from './venue.service';

@Module({
  imports: [TypeOrmModule.forFeature([VenueEntity])],
  providers: [VenueResolver, VenueService],
  exports: [VenueService],
})
export class VenueModule {}
