import { z } from 'zod';

import { eventSchema } from '../event';

export const getEventOutputSchema = eventSchema.describe('GetEventOutput:');

export type GetEventOutput = z.infer<typeof getEventOutputSchema>;
