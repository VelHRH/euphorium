import { z } from 'zod';

import { songSchema } from '../song';

export const createSongInputSchema = songSchema
  .pick({ name: true })
  .describe('CreateSongInput:');

export type CreateSongInput = z.infer<typeof createSongInputSchema>;
