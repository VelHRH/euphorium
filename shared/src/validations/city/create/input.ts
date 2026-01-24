import { z } from 'zod';

import { citySchema } from '../city';

export const createCityInputSchema = citySchema
  .pick({ name: true, countryCode: true })
  .describe('CreateCityInput:');

export type CreateCityInput = z.infer<typeof createCityInputSchema>;
