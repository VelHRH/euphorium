import { z } from 'zod';

import { baseSchema } from '../database';
import { Venue } from '../../types';
import { nameSchema } from '../common/name';

export const venueSchema = baseSchema.extend({
  name: nameSchema,
  countryCode: z.string().trim().min(1, 'Country code is required'),
  city: z.string().trim().min(1, 'City is required'),
  latitude: z.number(),
  longitude: z.number(),
  imgPath: z.string().nullable().optional(),
}) satisfies z.ZodType<Venue>;
