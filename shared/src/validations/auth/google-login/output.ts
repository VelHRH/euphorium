import { z } from 'zod';

import { userSchema } from '../../user/user';

export const googleLoginOutputSchema =
  userSchema.describe('GoogleLoginOutput:');

export type GoogleLoginOutput = z.infer<typeof googleLoginOutputSchema>;
