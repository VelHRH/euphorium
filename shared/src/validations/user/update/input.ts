import { z } from 'zod';

import { passwordSchema } from '../../common';
import { userSchema } from '../user';

export const updateUserInputSchema = userSchema
  .omit({ createdAt: true, updatedAt: true })
  .partial()
  .merge(userSchema.pick({ id: true }))
  .extend({
    password: passwordSchema.optional(),
  })
  .describe('UpdateUserInput:');

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;
