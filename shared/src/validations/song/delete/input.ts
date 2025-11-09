import { z } from 'zod';

import { songSchema } from '../song';

export const deleteSongInputSchema = songSchema
  .pick({ id: true })
  .describe('DeleteSongInput:');

export type DeleteSongInput = z.infer<typeof deleteSongInputSchema>;
