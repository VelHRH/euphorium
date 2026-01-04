import { z } from 'zod';
import { PaginationInput } from '../../types';

export const paginationInputSchema = z
  .object({
    first: z.number().optional(),
    after: z.string().optional(),
  })
  .describe('PaginationInput:') satisfies z.ZodType<PaginationInput>;
