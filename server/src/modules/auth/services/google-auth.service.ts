import { Injectable } from '@nestjs/common';

import { GqlContext } from '$modules/app/types';
import { SessionService } from '$modules/entities/session/session.service';
import { UserService } from '$modules/entities/user/user.service';
import { JwtPayload } from '$modules/token/types';

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  async createSession(
    user: JwtPayload['accessToken'],
    response: GqlContext['res'],
  ): Promise<boolean> {
    await this.sessionService.create({ response, ...user });

    return true;
  }

  async validateGoogleUser(email: string): Promise<JwtPayload['accessToken']> {
    const user = await this.userService.findOne({ email });

    if (user) {
      return { userId: user.id, email };
    }

    const newUser = await this.userService.create({ email, password: null });

    return { userId: newUser.id, email };
  }
}
