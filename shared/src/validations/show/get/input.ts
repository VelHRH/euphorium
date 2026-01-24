import { z } from 'zod';

import { showSchema } from '../show';

export const getShowInputSchema = showSchema
  .pick({ id: true })
  .describe('GetShowInput:');

export type GetShowInput = z.infer<typeof getShowInputSchema>;
