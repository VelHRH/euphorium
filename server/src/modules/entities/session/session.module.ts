import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionEntity } from './session.entity';
import { SessionService } from './session.service';

import { UserModule } from '../user/user.module';

import { CryptoModule } from '$modules/crypto/crypto.module';
import { TokenModule } from '$modules/token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity]),
    TokenModule,
    CryptoModule,
    UserModule,
  ],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
