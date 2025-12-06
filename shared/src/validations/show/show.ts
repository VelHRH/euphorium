import { z } from 'zod';

import { Show } from '../../types';
import { baseSchema } from '../database';
import { festivalSchema } from '../festival';
import { venueSchema } from '../venue';

export const showSchema = baseSchema.extend({
  name: z.string().trim().min(1, 'Name is required'),
  venue: venueSchema,
  date: z.date(),
  festival: festivalSchema,
}) satisfies z.ZodType<Show>;
