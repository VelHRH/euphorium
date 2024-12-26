import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { generate as generatePassword } from 'generate-password';
import { OAuth2Client } from 'google-auth-library';
import { GoogleLoginInput } from 'shared';

import { googlePayloadSchema, IdTokenPayload } from '../validation';

import { Config } from '$config';
import { SessionService } from '$modules/entities/session/session.service';
import { UserEntity } from '$modules/entities/user/user.entity';
import { UserService } from '$modules/entities/user/user.service';

@Injectable()
export class GoogleService {
  private readonly googleClient: OAuth2Client;

  private readonly googleConfig: Config['google'];

  private readonly securityConfig: Config['security'];

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService<Config>,
    private readonly sessionService: SessionService,
  ) {
    this.googleClient = new OAuth2Client();
    this.googleConfig = this.configService.getOrThrow('google');
    this.securityConfig = this.configService.getOrThrow('security');
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

    const password = generatePassword(this.securityConfig.password);

    const user = await this.userService.create({
      email,
      password,
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

  private async parseGoogleUser(idToken: string): Promise<IdTokenPayload> {
    const { googleClientId: audience } = this.googleConfig;

    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience,
      });

      const payload = ticket.getPayload();

      const validatedPayload = await googlePayloadSchema.validateAsync(
        payload,
        {
          allowUnknown: true,
        },
      );

      return validatedPayload;
    } catch (e) {
      throw new NotAcceptableException('Wrong parameters');
    }
  }
}
