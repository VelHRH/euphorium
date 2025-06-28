import { z } from 'zod';

import { songSchema } from '../song';

export const getSongOutputSchema = songSchema.pick({ name: true });

export type GetSongOutput = z.infer<typeof getSongOutputSchema>;
