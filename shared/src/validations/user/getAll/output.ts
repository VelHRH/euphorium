import { z } from 'zod';

import { userSchema } from '../user';

export const getAllUsersOutputSchema = userSchema
  .array()
  .describe('GetAllUsersOutput:');

export type GetAllUsersOutput = z.infer<typeof getAllUsersOutputSchema>;
