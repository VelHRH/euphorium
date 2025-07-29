import { z } from 'zod';

import { Song } from '../../types';
import { baseSchema } from '../database/base';

export const songSchema = baseSchema.extend({
  name: z.string().trim().min(1, 'Name is required'),
}) satisfies z.ZodType<Song>;
