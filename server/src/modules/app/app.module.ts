import { Module } from '@nestjs/common';

import { ConfigModule } from '$modules/config/config.module';
import { SongModule } from '$modules/entities/song/song.module';
import { GraphqlModule } from '$modules/graphql/graphql.module';

@Module({
  imports: [GraphqlModule, SongModule, ConfigModule],
})
export class AppModule {}
