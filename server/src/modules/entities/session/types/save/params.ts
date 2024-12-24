import { JwtPayload } from '$modules/token/types';

export type SaveParams = {
  decodedRefreshToken?: string;
} & JwtPayload['accessToken'];
