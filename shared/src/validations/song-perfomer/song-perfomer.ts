import { z } from 'zod';
import { SongPerformer } from '../../types';
import { artistSchema } from '../artist';
import { baseSchema } from '../database';
import { songSchema } from '../song';

export const songPerfomerSchema = baseSchema.extend({
  song: songSchema,
  artist: artistSchema,
}) satisfies z.ZodType<SongPerformer>;
