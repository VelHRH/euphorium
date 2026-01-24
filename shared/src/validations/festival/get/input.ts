import { z } from 'zod';

import { festivalSchema } from '../festival';

export const getFestivalInputSchema = festivalSchema
  .pick({ id: true })
  .describe('GetFestivalInput:');

export type GetFestivalInput = z.infer<typeof getFestivalInputSchema>;
