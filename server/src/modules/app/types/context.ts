import { Request, Response } from 'express';

import { JwtPayload, SignedTokens } from '$modules/token/types';

export type UserInGqlContext = JwtPayload['accessToken'] & SignedTokens;

export type GqlContext = {
  req: Request & {
    user?: UserInGqlContext;
  };
  res: Response;
};
