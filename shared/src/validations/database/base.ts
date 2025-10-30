import { z } from 'zod';

import { Base } from '../../types';

export const baseSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<Base>;
