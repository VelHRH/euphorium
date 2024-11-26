import joi from 'joi';

import { appConfig, appValidationSchema } from './app';
import { databaseConfig, databaseValidationSchema } from './database';

export const validationSchema = joi
  .object()
  .concat(appValidationSchema)
  .concat(databaseValidationSchema);

export const config = () => ({
  app: appConfig(),
  database: databaseConfig(),
});

export type Config = ReturnType<typeof config>;
