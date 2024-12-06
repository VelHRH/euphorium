import { z } from 'zod';

export const getSongSchema = z.object({
  id: z.number(),
});

export type GetSong = z.infer<typeof getSongSchema>;
