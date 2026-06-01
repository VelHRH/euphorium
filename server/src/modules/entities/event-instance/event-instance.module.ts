import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationService } from '$modules/pagination/pagination.service';
import { EventInstanceEntity } from './event-instance.entity';
import { EventInstanceService } from './event-instance.service';
import { EventInstanceResolver } from './event-instance.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([EventInstanceEntity])],
  providers: [EventInstanceResolver, EventInstanceService, PaginationService],
  exports: [EventInstanceService],
})
export class EventInstanceModule {}
