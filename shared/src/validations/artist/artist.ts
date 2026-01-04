import { z } from 'zod';

import { Artist } from '../../types';
import { baseSchema } from '../database';
import { socialSchema } from '../social/social';
import { nameSchema } from '../common/name';
import { imgPathSchema } from '../common';

export const artistSchema = baseSchema.extend({
  name: nameSchema,
  imgPath: imgPathSchema,
  label: z.string().nullable().optional(),
  social: socialSchema.nullable().optional(),
}) satisfies z.ZodType<Artist>;
