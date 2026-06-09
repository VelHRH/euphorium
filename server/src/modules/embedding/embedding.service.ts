import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Either, left, right } from '@sweet-monads/either';
import { I18nService } from 'nestjs-i18n';

import { InternalServerException } from '$exceptions';
import { Config } from '$config';
import { ExceptionsI18nKey } from '$i18n/keys/exceptions';
import { EMBEDDING_DIMENSION, GEMINI_EMBED_URL } from './embedding.constants';
import { GeminiEmbedContentResponse } from './embedding.types';

@Injectable()
export class EmbeddingService {
  constructor(
    private readonly configService: ConfigService<Config, true>,
    private readonly i18n: I18nService,
  ) {}

  async embed(text: string): Promise<Either<InternalServerException, number[]>> {
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

  private serviceUnavailable(): InternalServerException {
    return new InternalServerException(
      this.i18n.t(ExceptionsI18nKey.SERVICE_UNAVAILABLE),
    );
  }
}
