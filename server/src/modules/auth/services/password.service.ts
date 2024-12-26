import { Injectable, NotAcceptableException } from '@nestjs/common';
import {
  ConfirmationType,
  ForgotPasswordInput,
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

    const isPasswordValid = await this.cryptoService.comparePasswords(
      oldPassword,
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
}
