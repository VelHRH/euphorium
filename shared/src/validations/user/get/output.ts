import { z } from 'zod';

import { userSchema } from '../user';

export const getUserOutputSchema = userSchema.describe('GetUserOutput:');

export type GetUserOutput = z.infer<typeof getUserOutputSchema>;
