import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards';
import { JwtStrategy } from './strategies';

import { CryptoModule } from '$modules/crypto/crypto.module';
import { SessionModule } from '$modules/entities/session/session.module';
import { UserModule } from '$modules/entities/user/user.module';

@Module({
  imports: [UserModule, CryptoModule, SessionModule],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtGuard },
  ],
})
export class AuthModule {}
