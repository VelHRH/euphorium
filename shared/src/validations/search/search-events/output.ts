import { z } from 'zod';
import { eventSchema } from '../../event/event';
import { SearchEventOutput } from '../../../types';

export type SearchEventsOutput = {
  results: SearchEventOutput[];
};

export const searchEventsOutputSchema = z
  .object({
    results: z.array(
      z.object({
        item: eventSchema.omit({ descriptionEmbedding: true }),
        similarity: z.number().min(0).max(1),
      }),
    ),
  })
  .describe('SearchEventsOutput:') satisfies z.ZodType<SearchEventsOutput>;
