import { z } from 'zod';
import { SongWriter } from '../../types';
import { artistSchema } from '../artist';
import { baseSchema } from '../database';
import { songSchema } from '../song';

export const songWriterSchema = baseSchema.extend({
  song: songSchema,
  artist: artistSchema,
}) satisfies z.ZodType<SongWriter>;
