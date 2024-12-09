import { z } from 'zod';

import { Song } from '../../types';
import { baseSchema } from '../database/base';

export const songSchema = baseSchema.extend({
  name: z.string(),
}) satisfies z.ZodType<Song>;
