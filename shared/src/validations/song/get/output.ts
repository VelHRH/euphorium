import { z } from 'zod';

import { songSchema } from '../song';

export const getSongOutputSchema = z
  .object({
    success: songSchema.pick({ name: true }).optional(),
    error: z.string().optional(),
  })
  .describe('GetSongOutput:');

export type GetSongOutput = z.infer<typeof getSongOutputSchema>;
