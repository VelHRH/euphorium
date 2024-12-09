import { z } from 'zod';

import { songSchema } from '../song';

export const getSongInputSchema = songSchema
  .pick({ name: true })
  .describe('SongInput:');

export type GetSongInput = z.infer<typeof getSongInputSchema>;
