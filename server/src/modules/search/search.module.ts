import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventModule } from '$modules/entities/event/event.module';
import { EventEntity } from '$modules/entities/event/event.entity';
import { EmbeddingModule } from '$modules/embedding/embedding.module';
import { LlmModule } from '$modules/llm/llm.module';
import { SearchService } from './search.service';
import { SearchResolver } from './search.resolver';
import { EventReviewModule } from '$modules/entities/event-review/event-review.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity]),
    EmbeddingModule,
    LlmModule,
    EventModule,
    EventReviewModule,
  ],
  providers: [SearchService, SearchResolver],
  exports: [SearchService],
})
export class SearchModule {}
