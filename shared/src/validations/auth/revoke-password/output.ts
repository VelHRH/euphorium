import { z } from 'zod';

import { userNoPasswordSchema } from '../../user/user';

export const revokePasswordOutputSchema = userNoPasswordSchema.describe(
  'RevokePasswordOutput:',
);

export type RevokePasswordOutput = z.infer<typeof revokePasswordOutputSchema>;
