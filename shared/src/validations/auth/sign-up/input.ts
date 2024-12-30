import { z } from 'zod';

import { passwordSchema, userSchema } from '../../user/user';

export const signUpInputSchema = z
  .object({ email: userSchema.shape.email, password: passwordSchema })
  .describe('SignUpInput:');

export type SignUpInput = z.infer<typeof signUpInputSchema>;
