import { z } from 'zod';

import { paginationOutputSchema } from '../../pagination';
import { eventInstanceSchema } from '../event-instance';

export const listEventInstancesOutputSchema = paginationOutputSchema(
  eventInstanceSchema,
).describe('ListEventInstancesOutput:');

export type ListEventInstancesOutput = z.infer<
  typeof listEventInstancesOutputSchema
>;
