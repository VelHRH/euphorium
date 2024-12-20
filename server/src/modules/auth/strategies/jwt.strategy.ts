import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { StrategyName } from '../constants';

import { Config } from '$config';
import { GqlContext } from '$modules/app/types';
import { SessionService } from '$modules/entities/session/session.service';
import { SingedTokens } from '$modules/token/token.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, StrategyName.JWT) {
  private readonly jwtConfig: Config['jwt'];

  constructor(
    readonly configService: ConfigService<Config>,
    private readonly sessionService: SessionService,
  ) {
    const jwtConfig = configService.getOrThrow('jwt', { infer: true });

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: GqlContext['req']): string | null =>
          req.signedCookies[jwtConfig.refreshToken.cookieName] as string | null,
      ]),
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: jwtConfig.refreshToken.secret,
    });

    this.jwtConfig = jwtConfig;
  }

  async validate(req: GqlContext['req']): Promise<SingedTokens> {
    const signedAccessToken = req.signedCookies[
      this.jwtConfig.accessToken.cookieName
    ] as string | undefined;

    const signedRefreshToken = req.signedCookies[
      this.jwtConfig.refreshToken.cookieName
    ] as string | undefined;

    const tokens = await this.sessionService.verify({
      signedAccessToken,
      signedRefreshToken,
    });

    req.newTokens = tokens;

    return tokens;
  }
}
