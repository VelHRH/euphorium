import { z } from 'zod';

import { baseSchema } from '../database';
import { Venue } from '../../types';
import { nameSchema } from '../common/name';
import { imgPathSchema } from '../common';

export const venueSchema = baseSchema.extend({
  name: nameSchema,
  countryCode: z.string().trim().min(1, 'Country code is required'),
  city: z.string().trim().min(1, 'City is required'),
  latitude: z.number(),
  longitude: z.number(),
  imgPath: imgPathSchema,
}) satisfies z.ZodType<Venue>;
