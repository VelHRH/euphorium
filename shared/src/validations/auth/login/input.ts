import { z } from 'zod';

import { userSchema } from '../../user/user';

export const loginInputSchema = userSchema
  .pick({ email: true, password: true })
  .describe('LoginInput:');

export type LoginInput = z.infer<typeof loginInputSchema>;
