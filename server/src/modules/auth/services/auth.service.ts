import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginInput, SignUpInput } from 'shared';

import { GqlContext } from '$modules/app/types';
import { CryptoService } from '$modules/crypto/crypto.service';
import { SessionService } from '$modules/entities/session/session.service';
import { UserEntity } from '$modules/entities/user/user.entity';
import { UserService } from '$modules/entities/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly sessionService: SessionService,
  ) {}

  signUp(input: SignUpInput): Promise<UserEntity> {
    return this.userService.create(input);
  }

  async login(input: LoginInput, response: Response): Promise<UserEntity> {
    const { email: inputEmail, password: inputPassword } = input;

    const user = await this.userService.findOne(
      { email: inputEmail },
      { id: true, email: true, password: true },
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    const { id, email, password } = user;

    if (password === undefined || password === null) {
      throw new BadRequestException();
    }

    const isPasswordEqual = await this.cryptoService.comparePasswords(
      inputPassword,
      password,
    );

    if (!isPasswordEqual) {
      throw new UnauthorizedException();
    }

    await this.sessionService.create({ response, userId: id, email });

    return user;
  }

  logout(response: GqlContext['res']): Promise<boolean> {
    return this.sessionService.delete(response);
  }

  refresh(response: GqlContext['res']): Promise<boolean> {
    return this.sessionService.refresh(response);
  }
}
