import { z } from 'zod';

import { userNoPasswordSchema } from '../../user/user';

export const googleLoginOutputSchema =
  userNoPasswordSchema.describe('GoogleLoginOutput:');

export type GoogleLoginOutput = z.infer<typeof googleLoginOutputSchema>;
