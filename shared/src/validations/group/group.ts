import { z } from 'zod';
import { Group, SongWriter } from '../../types';
import { artistSchema } from '../artist';
import { baseSchema } from '../database';
import { songSchema } from '../song';
import { nameSchema } from '../common/name';
import { socialSchema } from '../social';

export const groupSchema = baseSchema.extend({
  name: nameSchema,
  imgPath: z.string().optional(),
  members: z.array(artistSchema),
  social: socialSchema.optional(),
}) satisfies z.ZodType<Group>;
