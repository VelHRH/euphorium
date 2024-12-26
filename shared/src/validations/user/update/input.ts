import { z } from 'zod';

import { userSchema } from '../user';

export const updateUserInputSchema = userSchema
  .omit({ createdAt: true, updatedAt: true })
  .partial()
  .merge(userSchema.pick({ id: true }))
  .describe('UpdateUserInput:');

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;
