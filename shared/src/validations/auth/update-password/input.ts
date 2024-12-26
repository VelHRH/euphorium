import { z } from 'zod';

import { userSchema } from '../../user/user';

export const updatePasswordInputSchema = z
  .object({
    oldPassword: userSchema.shape.password,
    newPassword: userSchema.shape.password,
  })
  .describe('UpdatePasswordInput:');

export type UpdatePasswordInput = z.infer<typeof updatePasswordInputSchema>;
