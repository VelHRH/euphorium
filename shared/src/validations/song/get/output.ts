import { z } from 'zod';

import { songSchema } from '../song';

export const getSongOutputSchema = songSchema
  .pick({ name: true })
  .describe('GetSongOutput:');

export type GetSongOutput = z.infer<typeof getSongOutputSchema>;
