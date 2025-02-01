import { z } from 'zod';

import { User } from '../../types';
import { emailSchema } from '../common';
import { passwordSchema } from '../common/password';
import { baseSchema } from '../database';

export const userSchema = baseSchema.extend({
  email: emailSchema,
  password: passwordSchema.nullable(),
}) satisfies z.ZodType<User>;
