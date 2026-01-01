import { z } from 'zod';

import { Song } from '../../types';
import { artistSchema } from '../artist';
import { baseSchema } from '../database';
import { groupSchema } from '../group';

export const songSchema = baseSchema.extend({
  name: z.string().trim().min(1, 'Name is required'),
  youtubeUrls: z.array(z.string()),
  album: z.string().nullable().optional(),
  postedAt: z.date(),
  performers: z.array(artistSchema),
  writers: z.array(artistSchema),
  group: groupSchema.nullable().optional(),
}) satisfies z.ZodType<Song>;
