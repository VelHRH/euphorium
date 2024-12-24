import { Response } from 'express';

import { JwtPayload } from '$modules/token/types';

export type CreateParams = {
  response: Response;
} & JwtPayload['accessToken'];
