import { z } from 'zod';

import { userSchema } from '../user';

export const getUserInputSchema = userSchema
  .pick({ id: true })
  .describe('GetUserInput:');

export type GetUserInput = z.infer<typeof getUserInputSchema>;
