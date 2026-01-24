import { z } from 'zod';

import { venueSchema } from '../venue';

export const getVenueInputSchema = venueSchema
  .pick({ id: true })
  .describe('GetVenueInput:');

export type GetVenueInput = z.infer<typeof getVenueInputSchema>;
