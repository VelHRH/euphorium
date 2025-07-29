import { z } from 'zod';

import { userNoPasswordSchema } from '../user';

export const updateUserOutputSchema =
  userNoPasswordSchema.describe('UpdateUserOutput:');

export type UpdateUserOutput = z.infer<typeof updateUserOutputSchema>;
