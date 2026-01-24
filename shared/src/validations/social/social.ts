import { z } from 'zod';

import { Social } from '../../types';
import { baseSchema } from '../database';

export const socialSchema = baseSchema.extend({
  x: z.string().nullable().optional(),
  instagram: z.string().nullable().optional(),
  facebook: z.string().nullable().optional(),
  youtube: z.string().nullable().optional(),
}) satisfies z.ZodType<Social>;
