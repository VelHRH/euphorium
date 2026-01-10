import { z } from 'zod';

import { paginationOutputSchema } from '../../pagination';
import { citySchema } from '../city';

export const listCitiesOutputSchema =
  paginationOutputSchema(citySchema).describe('ListCitiesOutput:');

export type ListCitiesOutput = z.infer<typeof listCitiesOutputSchema>;
