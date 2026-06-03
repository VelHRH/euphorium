import { z } from 'zod';

export const searchEventsInputSchema = z
  .object({
    query: z
      .string()
      .min(1, 'Search query cannot be empty')
      .max(500, 'Search query is too long'),
    limit: z.number().int().min(1).max(50).optional().default(5),
  })
  .describe('SearchEventsInput:');

export type SearchEventsInput = z.infer<typeof searchEventsInputSchema>;
