import { z } from 'zod';

import { Venue } from '../../types';
import { baseSchema } from '../database';

export const venueSchema = baseSchema.extend({
  name: z.string().trim().min(1, 'Name is required'),
  countryCode: z.string().trim().min(1, 'Country code is required'),
  city: z.string().trim().min(1, 'City is required'),
  latitude: z
    .number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  longitude: z
    .number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
}) satisfies z.ZodType<Venue>;
