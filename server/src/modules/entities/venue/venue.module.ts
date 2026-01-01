import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueEntity } from './venue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VenueEntity])],
  providers: [],
})
export class VenueModule {}
