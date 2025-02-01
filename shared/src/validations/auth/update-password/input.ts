import { z } from 'zod';

import { passwordSchema } from '../../common';
import { userSchema } from '../../user/user';

export const updatePasswordInputSchema = z
  .object({
    oldPassword: userSchema.shape.password,
    newPassword: passwordSchema,
  })
  .describe('UpdatePasswordInput:');

export type UpdatePasswordInput = z.infer<typeof updatePasswordInputSchema>;
