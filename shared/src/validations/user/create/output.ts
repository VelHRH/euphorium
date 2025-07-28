import { z } from 'zod';

import { userSchema } from '../user';

export const createUserOutputSchema = userSchema.describe('CreateUserOutput:');

export type CreateUserOutput = z.infer<typeof createUserOutputSchema>;
