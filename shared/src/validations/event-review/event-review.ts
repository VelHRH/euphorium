import { z } from 'zod';

import { baseSchema } from '../database';
import { EventReview } from '../../types';
import { eventInstanceSchema } from '../event-instance';
import { EMBEDDING_DIMENSION } from '../../constants';

export const eventReviewRatingSchema = z.number().int().min(1).max(10);

export const eventReviewSchema = baseSchema.extend({
  eventInstance: eventInstanceSchema,
  rating: eventReviewRatingSchema,
  comment: z.string(),
  commentEmbedding: z.array(z.number()).length(EMBEDDING_DIMENSION),
}) satisfies z.ZodType<EventReview>;
