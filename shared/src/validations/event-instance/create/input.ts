import { z } from 'zod';

import { eventInstanceSchema } from '../event-instance';

export const createEventInstanceInputSchema = eventInstanceSchema
  .pick({
    event: true,
    timeStart: true,
    timeEnd: true,
    specialName: true,
    rating: true,
  })
  .describe('CreateEventInstanceInput:');

export type CreateEventInstanceInput = z.infer<
  typeof createEventInstanceInputSchema
>;
