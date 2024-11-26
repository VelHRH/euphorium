import { NestFactory } from '@nestjs/core';

import { AppModule } from '$modules/app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const port = 3000;

  await app.listen(port);
}

void bootstrap();
