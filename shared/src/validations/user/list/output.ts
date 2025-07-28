import { z } from 'zod';

import { userSchema } from '../user';

export const listUsersOutputSchema = z
  .object({
    list: userSchema.array(),
  })
  .describe('ListUsersOutput:');

export type ListUsersOutput = z.infer<typeof listUsersOutputSchema>;
