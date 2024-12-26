import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthResolver } from './auth.resolver';
import { JwtGuard } from './guards';
import { AuthService, PasswordService } from './services';
import { GoogleService } from './services/google.service';
import { JwtStrategy } from './strategies';

import { CryptoModule } from '$modules/crypto/crypto.module';
import { ConfirmationModule } from '$modules/entities/confirmation/confirmation.module';
import { SessionModule } from '$modules/entities/session/session.module';
import { UserModule } from '$modules/entities/user/user.module';
import { TokenModule } from '$modules/token/token.module';

@Module({
  imports: [
    UserModule,
    CryptoModule,
    SessionModule,
    TokenModule,
    ConfirmationModule,
  ],
  providers: [
    AuthResolver,
    AuthService,
    PasswordService,
    GoogleService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtGuard },
  ],
})
export class AuthModule {}
