import { z } from 'zod';
import { SearchInput } from '../../types';

export const searchInputSchema = z
  .object({
    query: z
      .string()
      .min(1, 'Search query cannot be empty')
      .max(500, 'Search query is too long'),
    limit: z.number().int().min(1).max(50).optional().default(5),
  })
  .describe('SearchInput:') satisfies z.ZodType<SearchInput>;
