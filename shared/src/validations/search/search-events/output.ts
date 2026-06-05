import { z } from 'zod';
import { eventSchema } from '../../event/event';
import { SearchEventOutput } from '../../../types';

export type SearchEventsOutput = {
  byDescription: SearchEventOutput[];
  byReviews: SearchEventOutput[];
};

const searchEventOutputSchema = z.object({
  item: eventSchema.omit({ descriptionEmbedding: true }),
  similarity: z.number().min(0).max(1),
}) satisfies z.ZodType<SearchEventOutput>;

export const searchEventsOutputSchema = z
  .object({
    byDescription: z.array(searchEventOutputSchema),
    byReviews: z.array(searchEventOutputSchema),
  })
  .describe('SearchEventsOutput:') satisfies z.ZodType<SearchEventsOutput>;
