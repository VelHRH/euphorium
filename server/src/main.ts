import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { Config } from '$config';
import { AppModule } from '$modules/app/app.module';
import { SetCookiesInterceptor } from '$modules/cookie/cookie.interceptor';
import { TokenService } from '$modules/token/token.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<Config>>(ConfigService);

  const port = configService.getOrThrow('app.port', { infer: true });

  const cookieSecret = configService.getOrThrow('cookie.cookieSecret', {
    infer: true,
  });

  app.use(cookieParser(cookieSecret));

  app.useGlobalInterceptors(new SetCookiesInterceptor(app.get(TokenService)));

  await app.listen(port);
}

void bootstrap();
