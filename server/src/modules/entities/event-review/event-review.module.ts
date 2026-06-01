import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventReviewEntity } from './event-review.entity';
import { EventReviewService } from './event-review.service';
import { EventReviewResolver } from './event-review.resolver';
import { PaginationService } from '$modules/pagination/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventReviewEntity])],
  providers: [EventReviewResolver, EventReviewService, PaginationService],
  exports: [EventReviewService],
})
export class EventReviewModule {}
