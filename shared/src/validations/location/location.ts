import { z } from 'zod';

import { baseSchema } from '../database';
import { Location } from '../../types';
import { citySchema } from '../city';
import { LocationType } from '../../constants';
import { nameSchema } from '../common';

export const locationSchema = baseSchema.extend({
  name: nameSchema,
  city: citySchema,
  latitude: z.number(),
  longitude: z.number(),
  type: z.nativeEnum(LocationType),
}) satisfies z.ZodType<Location>;
