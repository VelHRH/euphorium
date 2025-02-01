import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import {
  GoogleLoginInput,
  GoogleTokenPayload,
  googleTokenPayloadSchema,
} from 'shared';

import { Config } from '$config';
import { SessionService } from '$modules/entities/session/session.service';
import { UserEntity } from '$modules/entities/user/user.entity';
import { UserService } from '$modules/entities/user/user.service';

@Injectable()
export class GoogleAuthService {
  private readonly googleClient: OAuth2Client;
  private readonly googleConfig: Config['google'];

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService<Config>,
    private readonly sessionService: SessionService,
  ) {
    this.googleClient = new OAuth2Client();
    this.googleConfig = this.configService.getOrThrow('google');
  }

  async login(
    input: GoogleLoginInput,
    response: Response,
  ): Promise<UserEntity> {
    const { idToken } = input;
    const { email } = await this.parseGoogleUser(idToken);
    const candidate = await this.userService.findOne({ email });

    if (candidate) {
      return this.createSession(response, candidate);
    }

    const user = await this.userService.create({
      email,
      password: null,
    });

    return this.createSession(response, user);
  }

  private async createSession(
    response: Response,
    user: UserEntity,
  ): Promise<UserEntity> {
    const { id, email } = user;

    await this.sessionService.create({ response, userId: id, email });

    return user;
  }

  private async parseGoogleUser(idToken: string): Promise<GoogleTokenPayload> {
    const { googleClientId: audience } = this.googleConfig;

    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience,
      });

      const validatedPayload = googleTokenPayloadSchema.parse(
        ticket.getPayload(),
      );

      return validatedPayload;
    } catch (e) {
      throw new NotAcceptableException('Wrong parameters');
    }
  }
}
