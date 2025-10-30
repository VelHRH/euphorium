import { z } from 'zod';

import { Artist } from '../../types';
import { baseSchema } from '../database';
import { socialSchema } from '../social/social';

export const artistSchema = baseSchema.extend({
  name: z.string().trim().min(1, 'Name is required'),
  imgPath: z.string().optional(),
  label: z.string().optional(),
  social: socialSchema.optional(),
}) satisfies z.ZodType<Artist>;
