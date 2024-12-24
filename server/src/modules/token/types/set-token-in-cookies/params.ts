import { Response } from 'express';

export type SetTokenInCookiesParams = {
  cookieName: string;
  expireIn: number;
  response: Response;
  token: string;
};
