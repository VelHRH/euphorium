import { z } from 'zod';

import { userNoPasswordSchema } from '../../user/user';

export const updatePasswordOutputSchema = userNoPasswordSchema.describe(
  'UpdatePasswordOutput:',
);

export type UpdatePasswordOutput = z.infer<typeof updatePasswordOutputSchema>;
