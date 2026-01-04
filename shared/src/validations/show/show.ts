import { z } from 'zod';

import { baseSchema } from '../database';
import { Show } from '../../types';
import { venueSchema } from '../venue';
import { imgPathSchema, nameSchema } from '../common';

export const showSchema = baseSchema.extend({
  name: nameSchema,
  venue: venueSchema,
  date: z.date(),
  imgPath: imgPathSchema,
}) satisfies z.ZodType<Show>;
