import { z } from 'zod';

import { userNoPasswordSchema } from '../user';

export const getUserOutputSchema =
  userNoPasswordSchema.describe('GetUserOutput:');

export type GetUserOutput = z.infer<typeof getUserOutputSchema>;
