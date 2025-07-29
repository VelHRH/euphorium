import { z } from 'zod';

import { userNoPasswordSchema } from '../../user/user';

export const loginOutputSchema = userNoPasswordSchema.describe('LoginOutput:');

export type LoginOutput = z.infer<typeof loginOutputSchema>;
