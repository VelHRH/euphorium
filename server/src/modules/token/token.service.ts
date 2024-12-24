import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import {
  InsertInCookiesParams,
  JwtPayload,
  SetTokenInCookiesParams,
  SingedTokens,
} from './types';

import { Config } from '$config';
import { GqlContext } from '$modules/app/types';
import { ONE_SECOND_IN_MS } from '$modules/common';
import { CookieService } from '$modules/cookie/cookie.service';
import { SetCookieParamsOptions } from '$modules/cookie/types';

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

    this.cookieService.set({
      response,
      name: cookieName,
      value: token,
      options: {
        ...this.tokensCookieOptions,
        expires: new Date(Date.now() + expireIn * ONE_SECOND_IN_MS),
      },
    });
  }

  insertInCookies(params: InsertInCookiesParams): void {
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

  async decodeToken<
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

  removeFromCookies(response: GqlContext['res']): void {
    const { accessToken, refreshToken } = this.tokensConfig;

    Object.values({ accessToken, refreshToken }).forEach((token) =>
      this.cookieService.clear({
        response,
        name: token.cookieName,
      }),
    );
  }

  getFromCookies(response: GqlContext['res']): SingedTokens {
    const { refreshToken: refreshTokenConfig, accessToken: accessTokenConfig } =
      this.configService.getOrThrow('jwt', {
        infer: true,
      });

    const signedAccessToken = response.req[
      accessTokenConfig.cookieName
    ] as string;

    const signedRefreshToken = response.req[
      refreshTokenConfig.cookieName
    ] as string;

    return { signedAccessToken, signedRefreshToken };
  }

  async decodeFromCookies(response: GqlContext['res']): Promise<JwtPayload> {
    const { signedAccessToken, signedRefreshToken } =
      this.getFromCookies(response);

    const decodedRefreshToken = await this.decodeToken(
      signedRefreshToken,
      'refreshToken',
    );

    const decodedAccessToken = await this.decodeToken(
      signedAccessToken,
      'accessToken',
    );

    return {
      accessToken: decodedAccessToken,
      refreshToken: decodedRefreshToken,
    };
  }
}
