import { Response } from 'express';

export type JwtPayload = {
  accessToken: {
    email: string;
    userId: number;
  };
  refreshToken: {
    refreshToken: string;
  };
};

export type SingedTokens = {
  signedAccessToken: string;
  signedRefreshToken: string;
};

export type SetTokenInCookiesParams = {
  cookieName: string;
  expireIn: number;
  response: Response;
  token: string;
};

export type InsertTokensInCookiesParams = {
  response: Response;
} & SingedTokens;
