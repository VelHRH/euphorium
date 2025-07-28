import { z } from 'zod';

import { userSchema } from '../user';

export const findOneUserOutputSchema =
  userSchema.describe('FindOneUserOutput:');

export type FindOneUserOutput = z.infer<typeof findOneUserOutputSchema>;
