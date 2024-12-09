import joi from 'joi';

import { appConfig, appValidationSchema } from './app';
import { databaseConfig, databaseValidationSchema } from './database';
import { jwtConfig, jwtValidationSchema } from './jwt';

export const validationSchema = joi
  .object()
  .concat(appValidationSchema)
  .concat(databaseValidationSchema)
  .concat(jwtValidationSchema);

export const config = () => ({
  app: appConfig(),
  database: databaseConfig(),
  jwt: jwtConfig(),
});

export type Config = ReturnType<typeof config>;
