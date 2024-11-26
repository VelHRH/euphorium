import joi from 'joi';

import { appConfig, appValidationSchema } from './app';

export const validationSchema = joi.object().concat(appValidationSchema);

export const config = () => ({
  app: appConfig(),
});

export type Config = ReturnType<typeof config>;
