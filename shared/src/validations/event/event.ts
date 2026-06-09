import { z } from 'zod';

import { baseSchema } from '../database';
import { Event } from '../../types';

export const eventSchema = baseSchema.extend({
  name: z.string(),
  description: z.string(),
  descriptionEmbedding: z.array(z.number()),
}) satisfies z.ZodType<Event>;
