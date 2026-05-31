import { z } from 'zod';
import { locationSchema } from '../location';

export const getLocationOutputSchema =
  locationSchema.describe('GetLocationOutput:');

export type GetLocationOutput = z.infer<typeof getLocationOutputSchema>;
