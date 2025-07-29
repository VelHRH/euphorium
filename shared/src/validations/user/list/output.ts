import { z } from 'zod';

import { userNoPasswordSchema } from '../user';

export const listUsersOutputSchema = z
  .object({
    list: userNoPasswordSchema.array(),
  })
  .describe('ListUsersOutput:');

export type ListUsersOutput = z.infer<typeof listUsersOutputSchema>;
