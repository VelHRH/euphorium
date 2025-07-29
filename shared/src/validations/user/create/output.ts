import { z } from 'zod';

import { userNoPasswordSchema } from '../user';

export const createUserOutputSchema =
  userNoPasswordSchema.describe('CreateUserOutput:');

export type CreateUserOutput = z.infer<typeof createUserOutputSchema>;
