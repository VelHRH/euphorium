import { z } from 'zod';

import { Base } from '../../types';

export const baseSchema = z.object({
  id: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<Base>;
