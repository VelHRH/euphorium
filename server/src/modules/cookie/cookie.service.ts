import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { ClearCookieParams, SetCookieParams } from './cookie.types';

import { Config } from '$config';

@Injectable()
export class CookieService {
  private readonly domain: string;

  constructor(private readonly configService: ConfigService<Config>) {
    this.domain = this.configService.getOrThrow('app.domain', { infer: true });
  }

  setCookie(response: Response, params: SetCookieParams): void {
    const { name, value, options } = params;
    const { expires, isHttpOnly, isSecure, isSigned } = options;

    response.cookie(name, value, {
      httpOnly: isHttpOnly,
      secure: isSecure,
      signed: isSigned,
      sameSite: 'none',
      domain: this.domain,
      expires,
    });
  }

  clearCookie(response: Response, params: ClearCookieParams): void {
    const { name } = params;

    response.clearCookie(name);
  }
}
