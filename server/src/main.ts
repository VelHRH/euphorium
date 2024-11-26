import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { Config } from '$config';
import { AppModule } from '$modules/app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<Config>>(ConfigService);

  const port = configService.getOrThrow('app.port', { infer: true });

  await app.listen(port);
}

void bootstrap();
