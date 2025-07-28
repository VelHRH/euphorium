import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Either, left, right } from '@sweet-monads/either';

import {
  GetFromCookiesParams,
  InsertInCookiesParams,
  JwtPayload,
  SetTokenInCookiesParams,
  SignedTokens,
} from './types';

import { Config } from '$config';
import { ONE_SECOND_IN_MS } from '$constants';
import { GqlContext } from '$modules/app/types';
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

  async create(payload: JwtPayload): Promise<SignedTokens> {
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

  async decode<
    T extends keyof Pick<
      typeof this.tokensConfig,
      'accessToken' | 'refreshToken'
    >,
  >(
    signedToken: string,
    tokenType: T,
  ): Promise<Either<UnauthorizedException, JwtPayload[T]>> {
    try {
      const decodedToken = await this.jwtService.verifyAsync<JwtPayload[T]>(
        signedToken,
        {
          secret: this.tokensConfig[tokenType].secret,
        },
      );

      return right(decodedToken);
    } catch {
      return left(new UnauthorizedException('Invalid token'));
    }
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

  getFromCookies(response: GqlContext['res']): GetFromCookiesParams {
    const { refreshToken: refreshTokenConfig, accessToken: accessTokenConfig } =
      this.configService.getOrThrow('jwt', {
        infer: true,
      });

    const signedCookies = response.req.signedCookies as Record<
      string,
      string | undefined
    >;

    const signedAccessToken = signedCookies[accessTokenConfig.cookieName];

    const signedRefreshToken = signedCookies[refreshTokenConfig.cookieName];

    return { signedAccessToken, signedRefreshToken };
  }
}
