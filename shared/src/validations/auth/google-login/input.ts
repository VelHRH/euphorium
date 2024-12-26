import { z } from 'zod';

export const googleLoginInputSchema = z.object({
  idToken: z.string(),
});

export type GoogleLoginInput = z.infer<typeof googleLoginInputSchema>;
