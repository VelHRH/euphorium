import { z } from 'zod';

import { eventSchema } from '../event';

export const createEventOutputSchema =
  eventSchema.describe('CreateEventOutput:');

export type CreateEventOutput = z.infer<typeof createEventOutputSchema>;
