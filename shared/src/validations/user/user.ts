import { z } from 'zod';

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../../constants';
import { User } from '../../types';
import { baseSchema } from '../database';

export const userSchema = baseSchema.extend({
  email: z.string().email(),
  password: z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
}) satisfies z.ZodType<User>;
