import { z } from 'zod';

import { locationSchema } from '../location';

export const getLocationInputSchema = locationSchema
  .pick({ id: true })
  .describe('GetLocationInput:');

export type GetLocationInput = z.infer<typeof getLocationInputSchema>;
