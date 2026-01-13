import { Module } from '@nestjs/common';

import { AuthModule } from '$modules/auth/auth.module';
import { ConfigModule } from '$modules/config/config.module';
import { CookieModule } from '$modules/cookie/cookie.module';
import { DatabaseModule } from '$modules/database/database.module';
import { ArtistModule } from '$modules/entities/artist/artit.module';
import { SessionModule } from '$modules/entities/session/session.module';
import { SongModule } from '$modules/entities/song/song.module';
import { UserModule } from '$modules/entities/user/user.module';
import { GraphqlModule } from '$modules/graphql/graphql.module';
import { TokenModule } from '$modules/token/token.module';
import { VenueModule } from '$modules/entities/venue/venue.module';
import { PaginationModule } from '$modules/pagination/pagination.module';
import { ShowModule } from '$modules/entities/show/show.module';
import { CityModule } from '$modules/entities/city/city.module';
import { FestivalModule } from '$modules/entities/festival/festival.module';

@Module({
  imports: [
    GraphqlModule,
    SongModule,
    ArtistModule,
    ConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    SessionModule,
    CookieModule,
    TokenModule,
    VenueModule,
    PaginationModule,
    ShowModule,
    CityModule,
    FestivalModule,
  ],
})
export class AppModule {}
