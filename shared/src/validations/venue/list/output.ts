import { z } from 'zod';

import { paginationOutputSchema } from '../../pagination';
import { venueSchema } from '../venue';

export const listVenuesOutputSchema =
  paginationOutputSchema(venueSchema).describe('ListVenuesOutput:');

export type ListVenuesOutput = z.infer<typeof listVenuesOutputSchema>;
