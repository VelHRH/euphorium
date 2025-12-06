import { z } from 'zod';

import { SongVideo } from '../../types';
import { baseSchema } from '../database';
import { showSchema } from '../show';
import { songSchema } from '../song';

export const songVideoSchema = baseSchema.extend({
  youtubeUrl: z.string().url('Invalid YouTube URL').optional(),
  song: songSchema,
  show: showSchema.optional(),
  isPrimary: z.boolean(),
}) satisfies z.ZodType<SongVideo>;
