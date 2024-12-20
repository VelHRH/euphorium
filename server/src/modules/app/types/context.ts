import { Request, Response } from 'express';

import { SingedTokens } from '$modules/token/token.types';

export type GqlContext = {
  req: Request & {
    newTokens?: SingedTokens;
  };
  res: Response;
};
