import { z } from 'zod';

import { showSchema } from '../show';

export const getShowOutputSchema = showSchema.describe('GetShowOutput:');

export type GetShowOutput = z.infer<typeof getShowOutputSchema>;
