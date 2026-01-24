import { z } from 'zod';

import { citySchema } from '../city';

export const createCityOutputSchema = citySchema.describe('CreateCityOutput:');

export type CreateCityOutput = z.infer<typeof createCityOutputSchema>;
