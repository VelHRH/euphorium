import { z } from 'zod';

import { eventSchema } from '../event';

export const createEventInputSchema = eventSchema
  .pick({
    name: true,
    description: true,
  })
  .describe('CreateEventInput:');

export type CreateEventInput = z.infer<typeof createEventInputSchema>;
