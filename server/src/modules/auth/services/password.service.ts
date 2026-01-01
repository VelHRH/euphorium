import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Either, left, right } from '@sweet-monads/either';
import {
  ConfirmationType,
  ForgotPasswordInput,
  ForgotPasswordOutput,
  RevokePasswordInput,
  RevokePasswordOutput,
  UpdatePasswordInput,
  UpdatePasswordOutput,
  User,
  UserNoPassword,
} from 'shared';

import { BadRequestException, NotFoundException } from '$exceptions';
import { AuthExceptionMessage } from '$exceptions/constants/auth';
import { CryptoService } from '$modules/crypto/crypto.service';
import { ConfirmationService } from '$modules/entities/confirmation/confirmation.service';
import { UserService } from '$modules/entities/user/user.service';

@Injectable()
export class PasswordService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly confirmationService: ConfirmationService,
  ) {}

  async forgot(
    input: ForgotPasswordInput,
  ): Promise<Either<NotFoundException, ForgotPasswordOutput>> {
    const userResult = await this.userService.findOne(input);

    if (userResult.isLeft()) {
      return left(userResult.value);
    }

    await this.confirmationService.send({
      type: ConfirmationType.PASSWORD,
      user: userResult.value,
    });

    return right({
      success: true,
    });
  }

  async update(
    id: User['id'],
    input: UpdatePasswordInput,
  ): Promise<
    Either<NotFoundException | BadRequestException, UpdatePasswordOutput>
  > {
    const { oldPassword, newPassword } = input;

    const userResult = await this.userService.findOne(
      { id },
      { password: true },
    );

    if (userResult.isLeft()) {
      return left(userResult.value);
    }

    const user = userResult.value;

    const isPasswordValid =
      typeof user.password !== 'string'
        ? true
        : await this.cryptoService.comparePasswords(
            oldPassword ?? '',
            user.password,
          );

    if (!isPasswordValid) {
      return left(
        new BadRequestException(AuthExceptionMessage.WRONG_CURRENT_PASSWORD),
      );
    }

    const hashedPassword = await this.userService.hashPassword(newPassword);

    return this.userService.update({
      id,
      password: hashedPassword,
    });
  }

  async revoke(
    params: RevokePasswordInput,
  ): Promise<
    Either<UnauthorizedException | NotFoundException, RevokePasswordOutput>
  > {
    const { token, newPassword } = params;

    const confirmationResult = await this.confirmationService.validate(token);

    if (confirmationResult.isLeft()) {
      return left(confirmationResult.value);
    }

    const confirmation = confirmationResult.value;

    const updatedUserResult = await this.updateUserPassword(
      confirmation.user.id,
      newPassword,
    );

    if (updatedUserResult.isLeft()) {
      return left(updatedUserResult.value);
    }

    await this.confirmationService.delete(
      { token },
      {
        user: updatedUserResult.value,
        type: ConfirmationType.PASSWORD_CHANGED,
      },
    );

    return updatedUserResult;
  }

  private async updateUserPassword(
    id: User['id'],
    newPassword: UpdatePasswordInput['newPassword'],
  ): Promise<Either<NotFoundException, UserNoPassword>> {
    const hashedPassword = await this.userService.hashPassword(newPassword);

    return this.userService.update({
      id,
      password: hashedPassword,
    });
  }
}
