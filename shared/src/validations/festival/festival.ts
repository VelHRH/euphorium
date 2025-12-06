import { z } from 'zod';

import { Festival } from '../../types';
import { baseSchema } from '../database';

export const festivalSchema = baseSchema.extend({
  name: z.string().trim().min(1, 'Name is required'),
  dateStart: z.date(),
  dateEnd: z.date(),
}) satisfies z.ZodType<Festival>;
