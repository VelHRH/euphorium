import { z } from 'zod';

import { userSchema } from '../../user/user';

export const updatePasswordOutputSchema = userSchema.describe(
  'UpdatePasswordOutput:',
);

export type UpdatePasswordOutput = z.infer<typeof updatePasswordOutputSchema>;
