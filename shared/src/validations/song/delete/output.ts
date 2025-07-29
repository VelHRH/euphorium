import { z } from 'zod';

export const deleteSongOutputSchema = z
  .object({
    success: z.boolean(),
  })
  .describe('DeleteSongOutput:');

export type DeleteSongOutput = z.infer<typeof deleteSongOutputSchema>;
