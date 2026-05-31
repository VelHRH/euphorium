import { z } from 'zod';

import { eventReviewSchema } from '../event-review';

export const createEventReviewInputSchema = eventReviewSchema
  .pick({
    eventInstance: true,
    comment: true,
    rating: true,
  })
  .describe('CreateEventReviewInput:');

export type CreateEventReviewInput = z.infer<
  typeof createEventReviewInputSchema
>;
