import { z } from 'zod';

export const forgotPasswordOutputSchema = z
  .object({
    success: z.boolean(),
  })
  .describe('ForgotPasswordOutput:');

export type ForgotPasswordOutput = z.infer<typeof forgotPasswordOutputSchema>;
