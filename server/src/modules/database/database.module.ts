import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseOptions } from './database.source';

import { Config } from '$config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => {
        const databaseConfig = configService.getOrThrow('database', {
          infer: true,
        });

        return databaseOptions(databaseConfig);
      },
    }),
  ],
})
export class DatabaseModule {}
