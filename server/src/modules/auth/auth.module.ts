import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthResolver } from './auth.resolver';
import { JwtAuthGuard } from './guards';
import { AuthService, PasswordService } from './services';
import { GoogleAuthService } from './services/google-auth.service';
import { JwtAuthStrategy } from './strategies';

import { CryptoModule } from '$modules/crypto/crypto.module';
import { ConfirmationModule } from '$modules/entities/confirmation/confirmation.module';
import { SessionModule } from '$modules/entities/session/session.module';
import { UserModule } from '$modules/entities/user/user.module';
import { TokenModule } from '$modules/token/token.module';
import { AuthController } from './auth.controller';

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
    GoogleAuthService,
    JwtAuthStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
