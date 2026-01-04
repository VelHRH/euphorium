import { z } from 'zod';

import { paginationOutputSchema } from '../../pagination';
import { showSchema } from '../show';

export const listShowsOutputSchema =
  paginationOutputSchema(showSchema).describe('ListShowsOutput:');

export type ListShowsOutput = z.infer<typeof listShowsOutputSchema>;
