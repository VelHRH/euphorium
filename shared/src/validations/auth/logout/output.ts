import { z } from 'zod';

export const logoutOutputSchema = z
  .object({
    success: z.boolean(),
  })
  .describe('LogoutOutput:');

export type LogoutOutput = z.infer<typeof logoutOutputSchema>;
