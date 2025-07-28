import { z } from 'zod';

import { userSchema } from '../user';

export const updateUserOutputSchema = userSchema.describe('UpdateUserOutput:');

export type UpdateUserOutput = z.infer<typeof updateUserOutputSchema>;
