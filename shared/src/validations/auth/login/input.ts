import { z } from 'zod';

import { passwordSchema } from '../../common';
import { userSchema } from '../../user/user';

export const loginInputSchema = z
  .object({ email: userSchema.shape.email, password: passwordSchema })
  .describe('LoginInput:');

export type LoginInput = z.infer<typeof loginInputSchema>;
