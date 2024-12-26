import { z } from 'zod';

import { userSchema } from '../../user/user';

export const signUpInputSchema = userSchema
  .pick({ email: true, password: true })
  .describe('SignUpInput:');

export type SignUpInput = z.infer<typeof signUpInputSchema>;
