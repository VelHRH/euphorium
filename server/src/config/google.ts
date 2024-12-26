import joi from 'joi';

export const googleValidationSchema = joi.object({
  GOOGLE_CLIENT_ID: joi.string().required(),
});

export const googleConfig = () => ({
  googleClientId: process.env.GOOGLE_CLIENT_ID,
});
