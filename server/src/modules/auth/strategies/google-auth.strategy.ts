import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  _StrategyOptionsBase,
  Profile,
  Strategy,
  VerifyCallback,
} from 'passport-google-oauth20';

import { GoogleAuthService } from '../services/google-auth.service';

import { Config } from '$config';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    configService: ConfigService<Config>,
  ) {
    const googleConfig = configService.getOrThrow('google', { infer: true });

    const oauthConfig: _StrategyOptionsBase = {
      clientID: googleConfig.oauthId,
      clientSecret: googleConfig.oauthSecret,
      callbackURL: googleConfig.callbackUrl,
      scope: ['email', 'profile'],
    };

    super(oauthConfig);
  }

  async validate(
    googleAccessToken: string,
    googleRefreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const { emails } = profile;

    if (!emails) {
      throw new UnauthorizedException();
    }

    const user = await this.googleAuthService.validateGoogleUser(
      emails[0].value,
    );

    return done(null, user);
  }
}
