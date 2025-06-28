import { z } from 'zod';

import { User } from '../../types';
import { emailSchema } from '../common';
import { baseSchema } from '../database';

export const userSchema = baseSchema.extend({
  email: emailSchema,
  password: z.string().nullable(),
}) satisfies z.ZodType<User>;
