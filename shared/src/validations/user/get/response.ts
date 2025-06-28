import { getUserOutputSchema } from './output';

import { createResponseSchema, ResponseType } from '../../common/response';

export const getUserResponseSchema = createResponseSchema(
  getUserOutputSchema,
  'GetUserOutput:',
);

export type GetUserResponse = ResponseType<typeof getUserOutputSchema>;
