import { z } from 'zod';

import { baseSchema } from '../database';
import { Location } from '../../types';
import { citySchema } from '../city';
import { LocationType } from '../../constants';
import { latitudeSchema, longitudeSchema } from '../common';

export const locationSchema = baseSchema.extend({
  name: z.string().nullable().optional(),
  city: citySchema,
  latitude: latitudeSchema,
  longitude: longitudeSchema,
  type: z.nativeEnum(LocationType),
}) satisfies z.ZodType<Location>;
