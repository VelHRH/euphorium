import { z } from 'zod';

import { eventReviewSchema } from '../event-review';

export const createEventReviewOutputSchema = eventReviewSchema.describe(
  'CreateEventReviewOutput:',
);

export type CreateEventReviewOutput = z.infer<
  typeof createEventReviewOutputSchema
>;
