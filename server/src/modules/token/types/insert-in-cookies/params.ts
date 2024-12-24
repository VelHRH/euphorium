import { Response } from 'express';

import { SingedTokens } from '../signed-tokens';

export type InsertInCookiesParams = {
  response: Response;
} & SingedTokens;
