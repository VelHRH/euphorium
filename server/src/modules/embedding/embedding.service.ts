import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Either, left, right } from '@sweet-monads/either';
import { I18nService } from 'nestjs-i18n';

import { InternalServerException } from '$exceptions';
import { Config } from '$config';
import { GEMINI_EMBED_URL } from './embedding.constants';
import { GeminiEmbedContentResponse } from './embedding.types';
import { EMBEDDING_DIMENSION } from 'shared';
import { LocalizedEntityService } from '$i18n/base/entity-i18n.service';
import { EmbeddingI18nKey } from '$i18n/keys/embedding';

@Injectable()
export class EmbeddingService extends LocalizedEntityService {
  constructor(
    private readonly configService: ConfigService<Config, true>,
    i18n: I18nService,
  ) {
    super(i18n);
  }

  protected localizedEntityKey(): string {
    return EmbeddingI18nKey.EMBEDDING;
  }

  async embed(
    text: string,
  ): Promise<Either<InternalServerException, number[]>> {
    const { apiKey } = this.configService.getOrThrow('gemini', { infer: true });

    if (!apiKey) {
      console.error('GEMINI_API_KEY is not configured');

      return left(this.serviceUnavailable());
    }

    try {
      const response = await fetch(GEMINI_EMBED_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          taskType: 'SEMANTIC_SIMILARITY',
          outputDimensionality: EMBEDDING_DIMENSION,
          content: {
            parts: [{ text }],
          },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();

        console.error(
          `Gemini embedding failed (${response.status}):`,
          errorBody,
        );

        return left(this.serviceUnavailable());
      }

      const data = (await response.json()) as GeminiEmbedContentResponse;
      const values = data.embedding?.values;

      if (!values?.length) {
        console.error('Gemini embedding response is empty');

        return left(this.serviceUnavailable());
      }

      return right(values);
    } catch (error) {
      console.error('Gemini embedding request failed:', error);

      return left(this.serviceUnavailable());
    }
  }
}
