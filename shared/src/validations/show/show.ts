import { z } from 'zod';

import { baseSchema } from '../database';
import { Show } from '../../types';
import { venueSchema } from '../venue';

export const showSchema = baseSchema.extend({
  name: z.string().trim().min(1, 'Name is required'),
  venue: venueSchema,
  date: z.date(),
}) satisfies z.ZodType<Show>;
