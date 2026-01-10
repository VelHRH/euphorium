import { z } from 'zod';

import { venueSchema } from '../venue';

export const createVenueInputSchema = venueSchema
  .pick({
    name: true,
    city: true,
    latitude: true,
    longitude: true,
    imgPath: true,
  })
  .describe('CreateVenueInput:');

export type CreateVenueInput = z.infer<typeof createVenueInputSchema>;
