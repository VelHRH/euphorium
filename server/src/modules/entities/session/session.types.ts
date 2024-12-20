import { Response } from 'express';

import { JwtPayload } from '$modules/token/token.types';

export type CreateParams = {
  response: Response;
} & JwtPayload['accessToken'];

export type VerifyParams = {
  signedAccessToken?: string;
  signedRefreshToken?: string;
};

export type SaveParams = {
  decodedRefreshToken?: string;
} & JwtPayload['accessToken'];
