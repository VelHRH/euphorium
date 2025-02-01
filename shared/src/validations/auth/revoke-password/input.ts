import { z } from 'zod';

import { passwordSchema } from '../../common';

export const revokePasswordInputSchema = z
  .object({
    newPassword: passwordSchema,
    repeatPassword: passwordSchema,
    token: z.string(),
  })
  .describe('RevokePasswordInput:');

export type RevokePasswordInput = z.infer<typeof revokePasswordInputSchema>;
