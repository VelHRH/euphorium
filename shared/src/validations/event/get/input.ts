import { z } from 'zod';

import { eventSchema } from '../event';

export const getEventInputSchema = eventSchema
  .pick({ id: true })
  .describe('GetEventInput:');

export type GetEventInput = z.infer<typeof getEventInputSchema>;
