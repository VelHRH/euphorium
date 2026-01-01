import { z } from 'zod';

import { passwordSchema } from '../../common';
import { userSchema } from '../user';

export const createUserInputSchema = z
  .object({
    email: userSchema.shape.email,
    password: passwordSchema.nullable().optional(),
  })
  .describe('CreateUserInput:');

export type CreateUserInput = z.infer<typeof createUserInputSchema>;
