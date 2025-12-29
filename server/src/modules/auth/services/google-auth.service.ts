import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Either, left, right } from '@sweet-monads/either';
import { Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import {
  GoogleLoginInput,
  GoogleTokenPayload,
  googleTokenPayloadSchema,
  UserNoPassword,
} from 'shared';

import { Config } from '$config';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '$exceptions';
import { AuthExceptionMessage } from '$exceptions/constants/auth';
import { SessionService } from '$modules/entities/session/session.service';
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
  ): Promise<Either<NotFoundException | BadRequestException, UserNoPassword>> {
    const { idToken } = input;
    const googleUserResult = await this.parseGoogleUser(idToken);

    if (googleUserResult.isLeft()) {
      return left(googleUserResult.value);
    }

    const { email } = googleUserResult.value;

    const candidate = await this.userService.findOne(
      { email },
      { id: true, email: true, createdAt: true, updatedAt: true },
    );

    if (candidate.isRight()) {
      return this.createSession(response, candidate.value);
    }

    const userResult = await this.userService.create({
      email,
      password: undefined,
    });

    if (userResult.isLeft()) {
      return left(userResult.value);
    }

    const user = userResult.value;

    return this.createSession(response, user);
  }

  private async createSession(
    response: Response,
    user: UserNoPassword,
  ): Promise<Either<UnauthorizedException, UserNoPassword>> {
    const { id, email } = user;

    const sessionResult = await this.sessionService.create({
      response,
      userId: id,
      email,
    });

    if (sessionResult.isLeft()) {
      return left(sessionResult.value);
    }

    return right(user);
  }

  private async parseGoogleUser(
    idToken: string,
  ): Promise<Either<BadRequestException, GoogleTokenPayload>> {
    const { googleClientId: audience } = this.googleConfig;

    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience,
    });

    try {
      const validatedPayload = googleTokenPayloadSchema.parse(
        ticket.getPayload(),
      );

      return right(validatedPayload);
    } catch (e) {
      return left(
        new BadRequestException(AuthExceptionMessage.WRONG_GOOGLE_CREDENTIALS),
      );
    }
  }
}
