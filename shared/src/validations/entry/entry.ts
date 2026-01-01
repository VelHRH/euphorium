import { z } from 'zod';

import { baseSchema } from '../database';
import { songSchema } from '../song';
import { Entry } from '../../types';
import { showSchema } from '../show';

export const entrySchema = baseSchema.extend({
  show: showSchema,
  song: songSchema,
  countryCode: z.string().optional(),
  totalPoints: z.number().optional(),
  publicPoints: z.number().optional(),
  juryPoints: z.number().optional(),
}) satisfies z.ZodType<Entry>;
