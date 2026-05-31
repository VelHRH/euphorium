import { z } from 'zod';

import { eventInstanceSchema } from '../event-instance';

export const getEventInstanceOutputSchema = eventInstanceSchema.describe(
  'GetEventInstanceOutput:',
);

export type GetEventInstanceOutput = z.infer<
  typeof getEventInstanceOutputSchema
>;
