import { z } from 'zod';

import { locationSchema } from '../location';
import { citySchema } from '../../city';

export const createLocationInputSchema = locationSchema
  .pick({
    name: true,
    latitude: true,
    longitude: true,
    type: true,
  })
  .extend({
    cityId: citySchema.shape.id,
  })
  .describe('CreateLocationInput:');

export type CreateLocationInput = z.infer<typeof createLocationInputSchema>;
