import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ConfirmationType,
  ForgotPasswordInput,
  RevokePasswordInput,
  UpdatePasswordInput,
  User,
} from 'shared';

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

  async forgot(input: ForgotPasswordInput): Promise<boolean> {
    const user = await this.userService.strictFindOne(input);

    await this.confirmationService.send({
      type: ConfirmationType.PASSWORD,
      user,
    });

    return true;
  }

  async update(
    id: User['id'],
    input: UpdatePasswordInput,
  ): Promise<User | null> {
    const { oldPassword, newPassword } = input;

    const user = await this.userService.strictFindOne(
      { id },
      { password: true },
    );

    const isPasswordValid = !user.password
      ? true
      : await this.cryptoService.comparePasswords(
          oldPassword ?? '',
          user.password,
        );

    if (!isPasswordValid) {
      throw new NotAcceptableException('Wrong current password');
    }

    const hashedPassword = await this.userService.hashPassword(newPassword);

    const updatedUser = await this.userService.update({
      id,
      password: hashedPassword,
    });

    return updatedUser;
  }

  async revoke(params: RevokePasswordInput): Promise<User> {
    const { token, newPassword } = params;

    const confirmation = await this.confirmationService.validate(token);

    const updatedUser = await this.updateUserPassword(
      confirmation.user.id,
      newPassword,
    );

    if (!updatedUser) {
      throw new UnauthorizedException();
    }

    await this.confirmationService.delete(
      { token },
      { user: updatedUser, type: ConfirmationType.PASSWORD_CHANGED },
    );

    return updatedUser;
  }

  private async updateUserPassword(
    id: User['id'],
    newPassword: UpdatePasswordInput['newPassword'],
  ): Promise<User | null> {
    const hashedPassword = await this.userService.hashPassword(newPassword);

    return this.userService.update({
      id,
      password: hashedPassword,
    });
  }
}
