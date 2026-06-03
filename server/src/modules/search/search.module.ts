import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventEntity } from '$modules/entities/event/event.entity';
import { EmbeddingModule } from '$modules/embedding/embedding.module';
import { SearchService } from './search.service';
import { SearchResolver } from './search.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity]), EmbeddingModule],
  providers: [SearchService, SearchResolver],
  exports: [SearchService],
})
export class SearchModule {}