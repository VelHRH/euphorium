import { z } from 'zod';

import { baseSchema } from '../database';
import { Event } from '../../types';
import { EMBEDDING_DIMENSION } from '../../constants';

export const eventSchema = baseSchema.extend({
  name: z.string(),
  description: z.string(),
  descriptionEmbedding: z.array(z.number()).length(EMBEDDING_DIMENSION),
}) satisfies z.ZodType<Event>;
