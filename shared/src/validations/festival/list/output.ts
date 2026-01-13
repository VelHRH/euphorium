import { z } from 'zod';

import { paginationOutputSchema } from '../../pagination';
import { festivalSchema } from '../festival';

export const listFestivalsOutputSchema = paginationOutputSchema(
  festivalSchema,
).describe('ListFestivalsOutput:');

export type ListFestivalsOutput = z.infer<typeof listFestivalsOutputSchema>;
