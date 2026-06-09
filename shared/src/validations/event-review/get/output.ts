import { z } from 'zod';

import { eventReviewSchema } from '../event-review';

export const getEventReviewOutputSchema = eventReviewSchema.describe(
  'GetEventReviewOutput:',
);

export type GetEventReviewOutput = z.infer<typeof getEventReviewOutputSchema>;
