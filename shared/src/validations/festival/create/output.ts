import { z } from 'zod';

import { festivalSchema } from '../festival';

export const createFestivalOutputSchema = festivalSchema.describe(
  'CreateFestivalOutput:',
);

export type CreateFestivalOutput = z.infer<typeof createFestivalOutputSchema>;
