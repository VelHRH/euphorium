import { Request, Response } from 'express';

import { JwtPayload, SingedTokens } from '$modules/token/types';

export type UserInGqlContext = JwtPayload['accessToken'];

export type GqlContext = {
  req: Request & {
    user: UserInGqlContext;
    newTokens?: SingedTokens;
  };
  res: Response;
};
