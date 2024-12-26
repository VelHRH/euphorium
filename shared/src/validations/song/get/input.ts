import { z } from 'zod';

import { songSchema } from '../song';

export const getSongInputSchema = songSchema
  .pick({ name: true })
  .describe('GetSongInput:');

export type GetSongInput = z.infer<typeof getSongInputSchema>;
