import { z } from 'zod';

import { Social } from '../../types';
import { baseSchema } from '../database';

export const socialSchema = baseSchema.extend({
  x: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  youtube: z.string().optional(),
}) satisfies z.ZodType<Social>;
