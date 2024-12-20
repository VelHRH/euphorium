import { Module } from '@nestjs/common';

import { AuthModule } from '$modules/auth/auth.module';
import { ConfigModule } from '$modules/config/config.module';
import { CookieModule } from '$modules/cookie/cookie.module';
import { DatabaseModule } from '$modules/database/database.module';
import { SessionModule } from '$modules/entities/session/session.module';
import { SongModule } from '$modules/entities/song/song.module';
import { UserModule } from '$modules/entities/user/user.module';
import { GraphqlModule } from '$modules/graphql/graphql.module';
import { TokenModule } from '$modules/token/token.module';

@Module({
  imports: [
    GraphqlModule,
    SongModule,
    ConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    SessionModule,
    CookieModule,
    TokenModule,
  ],
})
export class AppModule {}
