import { z } from 'zod';

import { passwordSchema } from '../../user/password';
import { userSchema } from '../../user/user';

export const updatePasswordInputSchema = z
  .object({
    oldPassword: userSchema.shape.password,
    newPassword: passwordSchema.shape.password,
  })
  .describe('UpdatePasswordInput:');

export type UpdatePasswordInput = z.infer<typeof updatePasswordInputSchema>;
