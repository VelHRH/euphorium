import { z } from 'zod';

import { userSchema } from '../../user/user';

export const signUpOutputSchema = userSchema.describe('SignUpOutput:');

export type SignUpOutput = z.infer<typeof signUpOutputSchema>;
