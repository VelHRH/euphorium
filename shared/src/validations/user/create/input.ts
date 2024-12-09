import { z } from 'zod';

import { userSchema } from '../user';

export const createUserInputSchema = userSchema
  .pick({ email: true, password: true })
  .describe('CreateUserInput:');

export type CreateUserInput = z.infer<typeof createUserInputSchema>;
