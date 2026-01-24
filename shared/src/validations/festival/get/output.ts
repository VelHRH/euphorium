import { z } from 'zod';

import { festivalSchema } from '../festival';

export const getFestivalOutputSchema =
  festivalSchema.describe('GetFestivalOutput:');

export type GetFestivalOutput = z.infer<typeof getFestivalOutputSchema>;
