import { z } from 'zod';

import { showSchema } from '../show';
import { venueSchema } from '../../venue';

export const createShowInputSchema = showSchema
  .pick({
    name: true,
    date: true,
  })
  .extend({
    venueId: venueSchema.shape.id,
  })
  .describe('CreateShowInput:');

export type CreateShowInput = z.infer<typeof createShowInputSchema>;
