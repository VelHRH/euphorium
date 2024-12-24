import joi from 'joi';

export const mailValidationSchema = joi.object({
  MAIL_USER: joi.string().required(),
  MAIL_PASS: joi.string().required(),
});

export const mailConfig = () => ({
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
});
