import { z } from 'zod';

import { citySchema } from '../../city';
import { venueSchema } from '../venue';

export const createVenueInputSchema = venueSchema
  .pick({
    name: true,
    latitude: true,
    longitude: true,
    imgPath: true,
  })
  .extend({
    cityId: citySchema.shape.id,
  })
  .describe('CreateVenueInput:');

export type CreateVenueInput = z.infer<typeof createVenueInputSchema>;
