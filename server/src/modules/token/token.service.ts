import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import {
  InsertTokensInCookiesParams,
  JwtPayload,
  SetTokenInCookiesParams,
  SingedTokens,
} from './token.types';

import { Config } from '$config';
import { ONE_SECOND_IN_MS } from '$modules/common';
import { CookieService } from '$modules/cookie/cookie.service';
import { SetCookieParamsOptions } from '$modules/cookie/cookie.types';

@Injectable()
export class TokenService {
  private readonly tokensConfig: Config['jwt'];

  private readonly tokensCookieOptions: SetCookieParamsOptions;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,
    private readonly cookieService: CookieService,
  ) {
    this.tokensConfig = this.configService.getOrThrow('jwt', { infer: true });
    this.tokensCookieOptions = {
      isHttpOnly: true,
      isSigned: true,
      isSecure: true,
    };
  }

  async create(payload: JwtPayload): Promise<SingedTokens> {
    const signedAccessToken = await this.jwtService.signAsync(
      payload.accessToken,
      {
        secret: this.tokensConfig.accessToken.secret,
        expiresIn: this.tokensConfig.accessToken.expireIn,
      },
    );

    const signedRefreshToken = await this.jwtService.signAsync(
      payload.refreshToken,
      {
        secret: this.tokensConfig.refreshToken.secret,
        expiresIn: this.tokensConfig.refreshToken.expireIn,
      },
    );

    return {
      signedAccessToken,
      signedRefreshToken,
    };
  }

  private setTokenInCookies(params: SetTokenInCookiesParams): void {
    const { expireIn, cookieName, response, token } = params;

    this.cookieService.setCookie(response, {
      name: cookieName,
      value: token,
      options: {
        ...this.tokensCookieOptions,
        expires: new Date(Date.now() + expireIn * ONE_SECOND_IN_MS),
      },
    });
  }

  insertTokensInCookies(params: InsertTokensInCookiesParams): void {
    const { response, ...tokens } = params;

    const tokensConfig: Record<
      string,
      Omit<SetTokenInCookiesParams, 'response'>
    > = {
      accessToken: {
        ...this.tokensConfig.accessToken,
        token: tokens.signedAccessToken,
      },
      refreshToken: {
        ...this.tokensConfig.refreshToken,
        token: tokens.signedRefreshToken,
      },
    };

    Object.values(tokensConfig).forEach((token) =>
      this.setTokenInCookies({ response, ...token }),
    );
  }

  async decode<
    T extends keyof Pick<
      typeof this.tokensConfig,
      'accessToken' | 'refreshToken'
    >,
  >(signedToken: string | undefined, tokenType: T): Promise<JwtPayload[T]> {
    const decodedToken = await this.jwtService.verifyAsync<JwtPayload[T]>(
      signedToken ?? '',
      {
        secret: this.tokensConfig[tokenType].secret,
      },
    );

    return decodedToken;
  }

  removeTokensFromCookies(response: Response): void {
    const { accessToken, refreshToken } = this.tokensConfig;

    Object.values({ accessToken, refreshToken }).forEach((token) =>
      this.cookieService.clearCookie(response, { name: token.cookieName }),
    );
  }
}
