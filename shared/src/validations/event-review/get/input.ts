import { z } from 'zod';

import { eventReviewSchema } from '../event-review';

export const getEventReviewInputSchema = eventReviewSchema
  .pick({ id: true })
  .describe('GetEventReviewInput:');

export type GetEventReviewInput = z.infer<typeof getEventReviewInputSchema>;
