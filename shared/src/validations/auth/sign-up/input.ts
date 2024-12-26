import { z } from 'zod';

import { passwordSchema } from '../../user/password';
import { userSchema } from '../../user/user';

export const signUpInputSchema = userSchema
  .pick({ email: true })
  .merge(passwordSchema)
  .describe('SignUpInput:');

export type SignUpInput = z.infer<typeof signUpInputSchema>;
