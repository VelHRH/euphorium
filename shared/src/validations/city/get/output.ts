import { z } from 'zod';

import { citySchema } from '../city';

export const getCityOutputSchema = citySchema.describe('GetCityOutput:');

export type GetCityOutput = z.infer<typeof getCityOutputSchema>;
