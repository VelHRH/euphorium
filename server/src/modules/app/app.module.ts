import { Module } from '@nestjs/common';

import { SongModule } from '$modules/entities/song/song.module';
import { GraphqlModule } from '$modules/graphql/graphql.module';

@Module({
  imports: [GraphqlModule, SongModule],
})
export class AppModule {}
