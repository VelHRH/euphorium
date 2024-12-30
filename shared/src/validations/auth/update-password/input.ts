import { z } from 'zod';

import { passwordSchema, userSchema } from '../../user/user';

export const updatePasswordInputSchema = z
  .object({
    oldPassword: userSchema.shape.password,
    newPassword: passwordSchema,
  })
  .describe('UpdatePasswordInput:');

export type UpdatePasswordInput = z.infer<typeof updatePasswordInputSchema>;
