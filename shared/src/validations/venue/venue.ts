import { z } from 'zod';

import { baseSchema } from '../database';
import { Venue } from '../../types';
import { nameSchema } from '../common/name';
import { imgPathSchema } from '../common';
import { citySchema } from '../city';

export const venueSchema = baseSchema.extend({
  name: nameSchema,
  city: citySchema,
  latitude: z.number(),
  longitude: z.number(),
  imgPath: imgPathSchema,
}) satisfies z.ZodType<Venue>;
