import { z } from 'zod';

import { artistSchema } from '../../artist';
import { songVideoSchema } from '../../song-video';
import { songSchema } from '../song';

export const createSongInputSchema = songSchema
  .pick({ name: true, postedAt: true, album: true })
  .extend({
    artistIds: z.array(artistSchema.shape.id),
    youtubeUrl: songVideoSchema.shape.youtubeUrl,
  })
  .describe('CreateSongInput:');

export type CreateSongInput = z.infer<typeof createSongInputSchema>;
