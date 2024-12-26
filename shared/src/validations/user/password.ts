import { z } from 'zod';

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../../constants';

export const passwordSchema = z.object({
  password: z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
});
