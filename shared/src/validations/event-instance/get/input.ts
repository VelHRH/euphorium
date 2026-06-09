import { z } from 'zod';

import { eventInstanceSchema } from '../event-instance';

export const getEventInstanceInputSchema = eventInstanceSchema
  .pick({ id: true })
  .describe('GetEventInstanceInput:');

export type GetEventInstanceInput = z.infer<typeof getEventInstanceInputSchema>;
