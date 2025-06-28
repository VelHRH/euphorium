import { signUpOutputSchema } from './output';

import { createResponseSchema, ResponseType } from '../../common/response';

export const signUpResponseSchema = createResponseSchema(signUpOutputSchema);

export type SignUpResponse = ResponseType<typeof signUpOutputSchema>;
