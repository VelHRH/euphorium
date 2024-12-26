import joi from 'joi';

export const googleValidationSchema = joi.object({
  GOOGLE_CLIENT_ID: joi.string().required(),
  GOOGLE_CLIENT_SECRET: joi.string().required(),
  GOOGLE_CALLBACK_URL: joi.string().required(),
});

export const googleConfig = () => ({
  oauthId: process.env.GOOGLE_CLIENT_ID,
  oauthSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackUrl: process.env.GOOGLE_CALLBACK_URL,
});
