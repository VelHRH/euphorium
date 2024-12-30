import { Response } from 'express';

import { SignedTokens } from '../signed-tokens';

export type InsertInCookiesParams = {
  response: Response;
} & SignedTokens;
