import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Either, left, right } from '@sweet-monads/either';
import { I18nService } from 'nestjs-i18n';
import { infer as Infer, ZodTypeAny } from 'zod';

import { InternalServerException } from '$exceptions';
import { Config } from '$config';
import { GEMINI_GENERATE_URL } from './llm.constants';
import { zodToGeminiJsonSchema } from './helpers/zod-to-gemini-schema';
import { GeminiGenerateContentResponse } from './llm.types';
import { LocalizedEntityService } from '$i18n/base/entity-i18n.service';
import { LlmI18nKey } from '$i18n/keys/llm';

@Injectable()
export class LlmService extends LocalizedEntityService {
  constructor(
    private readonly configService: ConfigService<Config, true>,
    i18n: I18nService,
  ) {
    super(i18n);
  }

  protected localizedEntityKey(): string {
    return LlmI18nKey.LLM;
  }

  async generateJson<T extends ZodTypeAny>(
    prompt: string,
    schema: T,
  ): Promise<Either<InternalServerException, Infer<T>>> {
    const { apiKey } = this.configService.getOrThrow('gemini', { infer: true });

    if (!apiKey) {
      console.error('GEMINI_API_KEY is not configured');

      return left(this.serviceUnavailable());
    }

    try {
      const response = await fetch(GEMINI_GENERATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0,
            responseMimeType: 'application/json',
            responseSchema: zodToGeminiJsonSchema(schema),
          },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();

        console.error(
          `Gemini generation failed (${response.status}):`,
          errorBody,
        );

        return left(this.serviceUnavailable());
      }

      const data = (await response.json()) as GeminiGenerateContentResponse;
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        console.error('Gemini generation response is empty');

        return left(this.serviceUnavailable());
      }

      let raw: unknown;

      try {
        raw = JSON.parse(text);
      } catch (parseError) {
        console.error(
          'Gemini generation response is not valid JSON:',
          parseError,
        );

        return left(this.serviceUnavailable());
      }

      const validationResult = schema.safeParse(raw);

      if (!validationResult.success) {
        console.error(
          'Gemini generation response failed validation:',
          validationResult.error,
        );

        return left(this.serviceUnavailable());
      }

      return right(validationResult.data);
    } catch (error) {
      console.error('Gemini generation request failed:', error);

      return left(this.serviceUnavailable());
    }
  }
}
