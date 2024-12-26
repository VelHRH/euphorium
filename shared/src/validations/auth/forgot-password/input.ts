import { z } from 'zod';

import { userSchema } from '../../user/user';

export const forgotPasswordInputSchema = userSchema
  .pick({ email: true })
  .describe('ForgotPasswordInput:');

export type ForgotPasswordInput = z.infer<typeof forgotPasswordInputSchema>;
