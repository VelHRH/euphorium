import { z } from 'zod';

import { festivalSchema } from '../festival';

export const createFestivalInputSchema = festivalSchema
  .pick({
    name: true,
    dateStart: true,
    dateEnd: true,
    imgPaths: true,
  })
  .describe('CreateFestivalInput:');

export type CreateFestivalInput = z.infer<typeof createFestivalInputSchema>;
