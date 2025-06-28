import { getSongOutputSchema } from './output';

import { createResponseSchema, ResponseType } from '../../common/response';

export const getSongResponseSchema = createResponseSchema(
  getSongOutputSchema,
  'GetSongOutput:',
);

export type GetSongResponse = ResponseType<typeof getSongOutputSchema>;
