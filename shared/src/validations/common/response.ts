import { z } from 'zod';

export const createResponseSchema = <T extends z.ZodTypeAny>(
  successSchema: T,
  description?: string,
) => {
  const responseSchema = z
    .object({
      success: successSchema.optional(),
      error: z.string().optional(),
    })
    .describe(description ?? 'Response');

  return responseSchema;
};

export type ResponseType<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof createResponseSchema<T>>
>;
