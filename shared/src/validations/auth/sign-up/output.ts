import { z } from 'zod';

import { userSchema } from '../../user/user';

export const signUpOutputSchema = userSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .describe('SignUpOutput:');

export type SignUpOutput = z.infer<typeof signUpOutputSchema>;
