import { z } from 'zod';

import { songSchema } from '../song';

export const deleteSongOutputSchema = z
  .object({
    success: z.boolean(),
    id: songSchema.shape.id,
  })
  .describe('DeleteSongOutput:');

export type DeleteSongOutput = z.infer<typeof deleteSongOutputSchema>;
