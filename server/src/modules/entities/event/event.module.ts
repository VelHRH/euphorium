import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { PaginationService } from '$modules/pagination/pagination.service';
import { EventEntity } from './event.entity';
import { EmbeddingModule } from '$modules/embedding/embedding.module';
import { EventReviewEntity } from '$modules/entities/event-review/event-review.entity';
import { LlmModule } from '$modules/llm/llm.module';
import { EventRagService } from './event-rag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity, EventReviewEntity]),
    EmbeddingModule,
    LlmModule,
  ],
  providers: [EventResolver, EventService, EventRagService, PaginationService],
  exports: [EventService, EventRagService],
})
export class EventModule {}
