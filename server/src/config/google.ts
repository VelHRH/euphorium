import joi from 'joi';

export const googleValidationSchema = joi.object({
  GOOGLE_CLIENT_ID: joi.string().required(),
  GOOGLE_CLIENT_SECRET: joi.string().required(),
  GOOGLE_CALLBACK_URL: joi.string().required(),
});

export const googleConfig = () => ({
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
});
