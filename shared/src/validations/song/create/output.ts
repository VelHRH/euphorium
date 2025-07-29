import { z } from 'zod';

import { songSchema } from '../song';

export const createSongOutputSchema = songSchema.describe('CreateSongOutput:');

export type CreateSongOutput = z.infer<typeof createSongOutputSchema>;
