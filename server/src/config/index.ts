import joi from 'joi';

import { appConfig, appValidationSchema } from './app';
import { cookieConfig, cookieValidationSchema } from './cookie';
import { databaseConfig, databaseValidationSchema } from './database';
import { googleConfig, googleValidationSchema } from './google';
import { jwtConfig, jwtValidationSchema } from './jwt';
import { mailConfig, mailValidationSchema } from './mail';
import { securityConfig, securityValidationSchema } from './security';

export const validationSchema = joi
  .object()
  .concat(appValidationSchema)
  .concat(databaseValidationSchema)
  .concat(jwtValidationSchema)
  .concat(cookieValidationSchema)
  .concat(mailValidationSchema)
  .concat(securityValidationSchema)
  .concat(googleValidationSchema);

export const config = () => ({
  app: appConfig(),
  database: databaseConfig(),
  jwt: jwtConfig(),
  cookie: cookieConfig(),
  mail: mailConfig(),
  security: securityConfig(),
  google: googleConfig(),
});

export type Config = ReturnType<typeof config>;
