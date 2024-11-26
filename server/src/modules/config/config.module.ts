import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { config, validationSchema } from '$config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [config],
      envFilePath: ['.env'],
    }),
  ],
})
export class ConfigModule {}
