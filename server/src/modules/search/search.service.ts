import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Either, left, right } from '@sweet-monads/either';
import { Repository } from 'typeorm';

import { InternalServerException } from '$exceptions';
import { EmbeddingService } from '$modules/embedding/embedding.service';
import { EventEntity } from '$modules/entities/event/event.entity';
import { SearchEventsOutput } from 'shared';

export interface SearchResult {
  event: EventEntity;
  similarity: number;
}

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    private readonly embeddingService: EmbeddingService,
  ) {}

  async searchSimilarEvents(
    query: string,
    limit: number = 5,
  ): Promise<Either<InternalServerException, SearchEventsOutput>> {
    // Get embedding for user query
    const embeddingResult = await this.embeddingService.embed(query);

    if (embeddingResult.isLeft()) {
      return left(embeddingResult.value);
    }

    const queryEmbedding = embeddingResult.value;

    try {
      // Use pgvector cosine distance to find similar events
      // The <=> operator calculates cosine distance (0 = identical, 1 = opposite)
      // We convert distance to similarity (1 - distance) for better UX
      const results = await this.eventRepository
        .createQueryBuilder('event')
        .select([
          'event.id',
          'event.name',
          'event.description',
          'event.createdAt',
          'event.updatedAt',
        ])
        .addSelect(
          `1 - (event.description_embedding <=> CAST(:queryEmbedding AS vector))`,
          'similarity',
        )
        .where('event.description_embedding IS NOT NULL')
        .setParameter('queryEmbedding', `[${queryEmbedding.join(',')}]`)
        .orderBy(
          'event.description_embedding <=> CAST(:queryEmbedding AS vector)',
          'ASC',
        )
        .limit(limit)
        .getRawAndEntities();

      const searchResults: SearchResult[] = results.entities.map(
        (event, index) => ({
          event,
          similarity: parseFloat(results.raw[index].similarity) || 0,
        }),
      );

      return right({ results: searchResults });
    } catch (error) {
      console.error('Vector search failed:', error);
      return left(
        new InternalServerException(
          'Search service is temporarily unavailable',
        ),
      );
    }
  }
}
