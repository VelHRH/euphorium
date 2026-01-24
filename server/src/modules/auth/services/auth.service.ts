import { Injectable } from '@nestjs/common';
import { Either, left } from '@sweet-monads/either';
import { Response } from 'express';
import {
  LoginInput,
  LoginOutput,
  LogoutOutput,
  SignUpInput,
  SignUpOutput,
  UserRoles,
} from 'shared';

import {
  BadRequestException,
  BaseException,
  NotFoundException,
  UnauthorizedException,
} from '$exceptions';
import { AuthExceptionMessage } from '$exceptions/constants/auth';
import { GqlContext } from '$modules/app/types';
import { CryptoService } from '$modules/crypto/crypto.service';
import { SessionService } from '$modules/entities/session/session.service';
import { UserService } from '$modules/entities/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly sessionService: SessionService,
  ) {}

  signUp(input: SignUpInput): Promise<Either<BaseException, SignUpOutput>> {
    return this.userService.create({ ...input, role: UserRoles.USER }); // TODO: in the future mabe let register admins directly
  }

  async login(
    input: LoginInput,
    response: Response,
  ): Promise<Either<BaseException, LoginOutput>> {
    const { email: inputEmail, password: inputPassword } = input;

    const userResult = await this.userService.findOne(
      { email: inputEmail },
      {
        id: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    );

    if (userResult.isLeft()) {
      return left(userResult.value);
    }

    const { id, email, password } = userResult.value;

    if (password === undefined || password === null) {
      return left(new BadRequestException());
    }

    const isPasswordEqual = await this.cryptoService.comparePasswords(
      inputPassword,
      password,
    );

    if (!isPasswordEqual) {
      return left(
        new UnauthorizedException(AuthExceptionMessage.WRONG_LOGIN_OR_PASSWORD),
      );
    }

    const sessionResult = await this.sessionService.create({
      response,
      userId: id,
      email,
    });

    if (sessionResult.isLeft()) {
      return left(sessionResult.value);
    }

    return userResult.map((user) => ({
      ...user,
      password: undefined,
    }));
  }

  logout(
    response: GqlContext['res'],
  ): Promise<Either<UnauthorizedException, LogoutOutput>> {
    return this.sessionService.delete(response);
  }

  refresh(
    response: GqlContext['res'],
  ): Promise<Either<UnauthorizedException | NotFoundException, boolean>> {
    return this.sessionService.refresh(response);
  }
}
