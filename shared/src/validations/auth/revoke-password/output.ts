import { z } from 'zod';

import { userSchema } from '../../user/user';

export const revokePasswordOutputSchema = userSchema.describe(
  'RevokePasswordOutput:',
);

export type RevokePasswordOutput = z.infer<typeof revokePasswordOutputSchema>;
