import { z } from 'zod';

import { passwordSchema } from '../password';
import { userSchema } from '../user';

export const updateUserInputSchema = userSchema
  .merge(passwordSchema)
  .omit({ createdAt: true, updatedAt: true })
  .partial()
  .merge(userSchema.pick({ id: true }))
  .describe('UpdateUserInput:');

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;
