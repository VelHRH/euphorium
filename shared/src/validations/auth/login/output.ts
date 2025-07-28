import { z } from 'zod';

import { userSchema } from '../../user/user';

export const loginOutputSchema = userSchema.describe('LoginOutput:');

export type LoginOutput = z.infer<typeof loginOutputSchema>;
