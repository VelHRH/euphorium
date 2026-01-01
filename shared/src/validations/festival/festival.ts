import { z } from 'zod';

import { baseSchema } from '../database';
import { Festival } from '../../types';
import { showSchema } from '../show';
import { nameSchema } from '../common/name';

export const festivalSchema = baseSchema.extend({
  name: nameSchema,
  dateStart: z.date(),
  dateEnd: z.date(),
  shows: z.array(showSchema),
}) satisfies z.ZodType<Festival>;
