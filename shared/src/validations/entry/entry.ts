import { z } from 'zod';

import { baseSchema } from '../database';
import { songSchema } from '../song';
import { Entry } from '../../types';
import { showSchema } from '../show';

export const entrySchema = baseSchema.extend({
  show: showSchema,
  song: songSchema,
  countryCode: z.string().nullable().optional(),
  totalPoints: z.number().nullable().optional(),
  publicPoints: z.number().nullable().optional(),
  juryPoints: z.number().nullable().optional(),
}) satisfies z.ZodType<Entry>;
