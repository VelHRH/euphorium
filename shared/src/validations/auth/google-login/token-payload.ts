import { z } from 'zod';

export const googleTokenPayloadSchema = z.object({
  email: z.string().email(),
});

export type GoogleTokenPayload = z.infer<typeof googleTokenPayloadSchema>;
