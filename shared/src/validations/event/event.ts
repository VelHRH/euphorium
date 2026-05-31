import { z } from 'zod';

import { baseSchema } from '../database';
import { Event } from '../../types';
import { locationSchema } from '../location';

export const eventSchema = baseSchema.extend({
  name: z.string(),
  location: locationSchema,
  description: z.string(),
  descriptionEmbedding: z.array(z.number()),
}) satisfies z.ZodType<Event>;
