import joi from 'joi';

import { NodeEnv } from './constants';

export const appValidationSchema = joi.object({
  PORT: joi.number().required(),
  DOMAIN: joi.string().required(),
  NODE_ENV: joi
    .string()
    .valid(...Object.values(NodeEnv))
    .required(),
});

export const appConfig = () => ({
  port: Number(process.env.PORT),
  domain: process.env.DOMAIN,
  isDevelopment: process.env.NODE_ENV === NodeEnv.DEVELOPMENT,
  isProduction: process.env.NODE_ENV === NodeEnv.PRODUCTION,
});
