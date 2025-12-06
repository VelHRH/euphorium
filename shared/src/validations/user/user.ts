import { z } from 'zod';

import { User } from '../../types';
import { emailSchema } from '../common';
import { baseSchema } from '../database';

export const userSchema = baseSchema.extend({
  email: emailSchema,
  password: z.string().optional(),
}) satisfies z.ZodType<User>;

export const userNoPasswordSchema = userSchema.omit({ password: true });

export type UserNoPassword = z.infer<typeof userNoPasswordSchema>;
