import { zodToJsonSchema } from 'zod-to-json-schema';
import { ZodTypeAny } from 'zod';

import { GeminiJsonSchema } from '../llm.types';

export function zodToGeminiJsonSchema(schema: ZodTypeAny): GeminiJsonSchema {
  const { $schema: unusedSchema, ...jsonSchema } = zodToJsonSchema(schema, {
    $refStrategy: 'none',
  });

  return jsonSchema as GeminiJsonSchema;
}
