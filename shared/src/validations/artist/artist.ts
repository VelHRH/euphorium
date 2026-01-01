import { z } from 'zod';

import { Artist } from '../../types';
import { baseSchema } from '../database';
import { socialSchema } from '../social/social';
import { nameSchema } from '../common/name';

export const artistSchema = baseSchema.extend({
  name: nameSchema,
  imgPath: z.string().nullable().optional(),
  label: z.string().nullable().optional(),
  social: socialSchema.nullable().optional(),
}) satisfies z.ZodType<Artist>;
