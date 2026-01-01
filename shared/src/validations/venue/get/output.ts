import { z } from 'zod';

import { venueSchema } from '../venue';

export const getVenueOutputSchema = venueSchema.describe('GetVenueOutput:');

export type GetVenueOutput = z.infer<typeof getVenueOutputSchema>;
