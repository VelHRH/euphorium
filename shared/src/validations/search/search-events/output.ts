import { z } from 'zod';
import { eventSchema } from '../../event/event';
import { SearchResult } from '../../../types';

export const searchResultSchema = z
  .object({
    event: eventSchema.omit({ descriptionEmbedding: true }),
    similarity: z.number().min(0).max(1),
  })
  .describe('SearchResult:') satisfies z.ZodType<SearchResult>;

export const searchEventsOutputSchema = z
  .object({
    results: z.array(searchResultSchema),
  })
  .describe('SearchEventsOutput:');

export type SearchEventsOutput = z.infer<typeof searchEventsOutputSchema>;
