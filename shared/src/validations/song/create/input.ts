import { z } from 'zod';

import { artistSchema } from '../../artist';
import { songSchema } from '../song';

export const createSongInputSchema = songSchema
  .pick({ name: true, postedAt: true, album: true })
  .extend({
    artistIds: z.array(artistSchema.shape.id),
    youtubeUrls: songSchema.shape.youtubeUrls.optional(),
  })
  .describe('CreateSongInput:');

export type CreateSongInput = z.infer<typeof createSongInputSchema>;
