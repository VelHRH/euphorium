import { z } from 'zod';

import { showSchema } from '../show';

export const createShowOutputSchema = showSchema.describe('CreateShowOutput:');

export type CreateShowOutput = z.infer<typeof createShowOutputSchema>;
