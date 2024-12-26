import { z } from 'zod';

import { passwordSchema } from './password';

import { User } from '../../types';
import { baseSchema } from '../database';

export const userSchema = baseSchema.extend({
  email: z.string().email(),
  password: passwordSchema.shape.password.nullable(),
}) satisfies z.ZodType<User>;
