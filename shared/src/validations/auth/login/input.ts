import { z } from 'zod';

import { passwordSchema } from '../../user/password';
import { userSchema } from '../../user/user';

export const loginInputSchema = userSchema
  .pick({ email: true })
  .merge(passwordSchema)
  .describe('LoginInput:');

export type LoginInput = z.infer<typeof loginInputSchema>;
