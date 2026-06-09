import { z } from 'zod';

import { baseSchema } from '../database';
import { EventReview } from '../../types';
import { eventInstanceSchema } from '../event-instance';

export const eventReviewSchema = baseSchema.extend({
  eventInstance: eventInstanceSchema,
  rating: z.number(),
  comment: z.string(),
  commentEmbedding: z.array(z.number()),
}) satisfies z.ZodType<EventReview>;
