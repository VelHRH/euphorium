import { z } from 'zod';

import { eventInstanceSchema } from '../../event-instance';
import { eventReviewSchema } from '../event-review';

export const createEventReviewInputSchema = eventReviewSchema
  .pick({
    comment: true,
    rating: true,
  })
  .extend({
    eventInstanceId: eventInstanceSchema.shape.id,
  })
  .describe('CreateEventReviewInput:');

export type CreateEventReviewInput = z.infer<
  typeof createEventReviewInputSchema
>;
