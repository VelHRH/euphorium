import { z } from 'zod';

import { eventInstanceSchema } from '../event-instance';

export const createEventInstanceOutputSchema = eventInstanceSchema.describe(
  'CreateEventInstanceOutput:',
);

export type CreateEventInstanceOutput = z.infer<
  typeof createEventInstanceOutputSchema
>;
