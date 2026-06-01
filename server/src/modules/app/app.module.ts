import { Module } from '@nestjs/common';

import { AuthModule } from '$modules/auth/auth.module';
import { ConfigModule } from '$modules/config/config.module';
import { CookieModule } from '$modules/cookie/cookie.module';
import { DatabaseModule } from '$modules/database/database.module';
import { SessionModule } from '$modules/entities/session/session.module';
import { UserModule } from '$modules/entities/user/user.module';
import { GraphqlModule } from '$modules/graphql/graphql.module';
import { TokenModule } from '$modules/token/token.module';
import { LocationModule } from '$modules/entities/location/location.module';
import { PaginationModule } from '$modules/pagination/pagination.module';
import { EventModule } from '$modules/entities/event/event.module';
import { CityModule } from '$modules/entities/city/city.module';
import { EventReviewModule } from '$modules/entities/event-review/event-review.module';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    GraphqlModule,
    ConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    SessionModule,
    CookieModule,
    TokenModule,
    LocationModule,
    PaginationModule,
    EventModule,
    CityModule,
    EventReviewModule,
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: join(__dirname, '../../i18n/'),
          watch: true,
        },
      }),
      resolvers: [
        new QueryResolver(['lang', 'l']),
        new HeaderResolver(['x-custom-lang']),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
