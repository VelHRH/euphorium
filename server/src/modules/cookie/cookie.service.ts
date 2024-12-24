import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ClearParams, SetParams } from './types';

import { Config } from '$config';

@Injectable()
export class CookieService {
  private readonly domain: string;

  constructor(private readonly configService: ConfigService<Config>) {
    this.domain = this.configService.getOrThrow('app.domain', { infer: true });
  }

  set(params: SetParams): void {
    const { name, value, options, response } = params;
    const { expires, isHttpOnly, isSecure, isSigned } = options;

    response.cookie(name, value, {
      httpOnly: isHttpOnly,
      secure: isSecure,
      signed: isSigned,
      sameSite: 'lax',
      domain: this.domain,
      expires,
    });
  }

  clear(params: ClearParams): void {
    const { name, response } = params;

    response.clearCookie(name);
  }
}
