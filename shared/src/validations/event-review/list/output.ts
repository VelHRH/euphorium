import { z } from 'zod';

import { paginationOutputSchema } from '../../pagination';
import { eventReviewSchema } from '../event-review';

export const listEventReviewsOutputSchema = paginationOutputSchema(
  eventReviewSchema,
).describe('ListEventReviewsOutput:');

export type ListEventReviewsOutput = z.infer<
  typeof listEventReviewsOutputSchema
>;
