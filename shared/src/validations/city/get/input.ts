import { z } from 'zod';

import { citySchema } from '../city';

export const getCityInputSchema = citySchema
  .pick({ id: true })
  .describe('GetCityInput:');

export type GetCityInput = z.infer<typeof getCityInputSchema>;
