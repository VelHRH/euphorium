import joi from 'joi';

export const cookieValidationSchema = joi.object({
  COOKIE_SECRET: joi.string().required(),
});

export const cookieConfig = () => ({
  cookieSecret: process.env.COOKIE_SECRET,
});
