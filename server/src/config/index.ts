import joi from 'joi';

import { appConfig, appValidationSchema } from './app';
import { cookieConfig, cookieValidationSchema } from './cookie';
import { databaseConfig, databaseValidationSchema } from './database';
import { jwtConfig, jwtValidationSchema } from './jwt';
import { mailConfig, mailValidationSchema } from './mail';

export const validationSchema = joi
  .object()
  .concat(appValidationSchema)
  .concat(databaseValidationSchema)
  .concat(jwtValidationSchema)
  .concat(cookieValidationSchema)
  .concat(mailValidationSchema);

export const config = () => ({
  app: appConfig(),
  database: databaseConfig(),
  jwt: jwtConfig(),
  cookie: cookieConfig(),
  mail: mailConfig(),
});

export type Config = ReturnType<typeof config>;
