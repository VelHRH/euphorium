import { Module } from '@nestjs/common';

import { ConfigModule } from '$modules/config/config.module';
import { DatabaseModule } from '$modules/database/database.module';
import { SongModule } from '$modules/entities/song/song.module';
import { UserModule } from '$modules/entities/user/user.module';
import { GraphqlModule } from '$modules/graphql/graphql.module';

@Module({
  imports: [
    GraphqlModule,
    SongModule,
    ConfigModule,
    DatabaseModule,
    UserModule,
  ],
})
export class AppModule {}
