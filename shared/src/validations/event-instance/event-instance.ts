import { z } from 'zod';

import { baseSchema } from '../database';
import { EventInstance } from '../../types';
import { eventSchema } from '../event';
import { locationSchema } from '../location';

export const eventInstanceSchema = baseSchema.extend({
  event: eventSchema,
  timeStart: z.date(),
  timeEnd: z.date(),
  location: locationSchema,
  specialName: z.string().nullable().optional(),
  rating: z.number().nullable().optional(),
}) satisfies z.ZodType<EventInstance>;
