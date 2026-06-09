import { z } from 'zod';

export const rankedEventIdsSchema = z.object({
  eventIds: z.array(z.string()),
});

export type RankedEventIds = z.infer<typeof rankedEventIdsSchema>;
