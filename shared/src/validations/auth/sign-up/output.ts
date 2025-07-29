import { z } from 'zod';

import { userNoPasswordSchema } from '../../user/user';

export const signUpOutputSchema =
  userNoPasswordSchema.describe('SignUpOutput:');

export type SignUpOutput = z.infer<typeof signUpOutputSchema>;
