import { z } from 'zod';

import { venueSchema } from '../venue';

export const createVenueOutputSchema =
  venueSchema.describe('CreateVenueOutput:');

export type CreateVenueOutput = z.infer<typeof createVenueOutputSchema>;
