import { z } from 'zod';
import { Group } from '../../types';
import { artistSchema } from '../artist';
import { baseSchema } from '../database';
import { nameSchema } from '../common/name';
import { socialSchema } from '../social';
import { imgPathSchema } from '../common';

export const groupSchema = baseSchema.extend({
  name: nameSchema,
  imgPath: imgPathSchema,
  members: z.array(artistSchema),
  social: socialSchema.nullable().optional(),
}) satisfies z.ZodType<Group>;
