import { z } from 'zod';

import { paginationOutputSchema } from '../../pagination';
import { locationSchema } from '../location';

export const listLocationsOutputSchema = paginationOutputSchema(
  locationSchema,
).describe('ListLocationsOutput:');

export type ListLocationsOutput = z.infer<typeof listLocationsOutputSchema>;
