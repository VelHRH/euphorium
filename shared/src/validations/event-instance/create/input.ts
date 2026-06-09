import { z } from 'zod';

import { eventSchema } from '../../event';
import { locationSchema } from '../../location';
import { eventInstanceSchema } from '../event-instance';

export const createEventInstanceInputSchema = eventInstanceSchema
  .pick({
    timeStart: true,
    timeEnd: true,
    specialName: true,
    rating: true,
  })
  .extend({
    eventId: eventSchema.shape.id,
    locationId: locationSchema.shape.id,
  })
  .describe('CreateEventInstanceInput:');

export type CreateEventInstanceInput = z.infer<
  typeof createEventInstanceInputSchema
>;
