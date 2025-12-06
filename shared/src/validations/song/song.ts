import { z } from 'zod';

import { Song } from '../../types';
import { artistSchema } from '../artist';
import { baseSchema } from '../database';

export const songSchema = baseSchema.extend({
  name: z.string().trim().min(1, 'Name is required'),
  artists: z.array(artistSchema),
  album: z.string(),
  postedAt: z.date(),
}) satisfies z.ZodType<Song>;
