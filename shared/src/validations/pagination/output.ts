import { z } from 'zod';

export const paginationOutputSchema = <T extends z.ZodTypeAny>(
  nodeSchema: T,
) => {
  return z.object({
    edges: z.array(
      z.object({
        node: nodeSchema,
        cursor: z.string(),
      }),
    ),
    pageInfo: z.object({
      hasNextPage: z.boolean(),
      endCursor: z.string().optional(),
    }),
  });
};
