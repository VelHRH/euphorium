import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokenService } from './token.service';

import { CookieModule } from '$modules/cookie/cookie.module';

@Module({
  imports: [JwtModule.register({}), CookieModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
