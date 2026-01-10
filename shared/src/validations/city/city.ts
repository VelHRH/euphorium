import { z } from 'zod';

import { baseSchema } from '../database';
import { City } from '../../types';
import { nameSchema } from '../common/name';

export const citySchema = baseSchema.extend({
  name: nameSchema,
  countryCode: z.string().trim().min(1, 'Country code is required'),
}) satisfies z.ZodType<City>;
