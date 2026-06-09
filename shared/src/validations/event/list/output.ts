import { z } from 'zod';

import { paginationOutputSchema } from '../../pagination';
import { eventSchema } from '../event';

export const listEventsOutputSchema =
  paginationOutputSchema(eventSchema).describe('ListEventsOutput:');

export type ListEventsOutput = z.infer<typeof listEventsOutputSchema>;
