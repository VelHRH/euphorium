import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { PaginationService } from '$modules/pagination/pagination.service';
import { EventEntity } from './event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  providers: [EventResolver, EventService, PaginationService],
  exports: [EventService],
})
export class EventModule {}
