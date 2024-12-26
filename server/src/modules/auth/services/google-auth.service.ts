import { Injectable } from '@nestjs/common';

import { GqlContext, UserInGqlContext } from '$modules/app/types';
import { SessionService } from '$modules/entities/session/session.service';
import { UserService } from '$modules/entities/user/user.service';

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  async createSession(
    user: UserInGqlContext,
    response: GqlContext['res'],
  ): Promise<boolean> {
    await this.sessionService.create({ response, ...user });

    return true;
  }

  async validateGoogleUser(email: string): Promise<UserInGqlContext> {
    const user = await this.userService.findOne({ email });

    if (user) {
      return { userId: user.id, email };
    }

    const newUser = await this.userService.create({ email, password: null });

    return { userId: newUser.id, email };
  }
}
