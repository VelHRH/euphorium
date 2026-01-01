import { z } from 'zod';

import { Artist } from '../../types';
import { baseSchema } from '../database';
import { socialSchema } from '../social/social';
import { nameSchema } from '../common/name';

export const artistSchema = baseSchema.extend({
  name: nameSchema,
  imgPath: z.string().optional(),
  label: z.string().optional(),
  social: socialSchema.optional(),
}) satisfies z.ZodType<Artist>;
