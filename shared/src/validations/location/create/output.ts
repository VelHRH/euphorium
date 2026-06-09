import { z } from 'zod';

import { locationSchema } from '../location';

export const createLocationOutputSchema = locationSchema.describe(
  'CreateLocationOutput:',
);

export type CreateLocationOutput = z.infer<typeof createLocationOutputSchema>;
