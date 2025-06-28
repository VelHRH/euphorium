import { z } from 'zod';

import { userSchema } from '../user';

export const createUserOutputSchema = userSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .describe('CreateUserOutput:');

export type CreateUserOutput = z.infer<typeof createUserOutputSchema>;
