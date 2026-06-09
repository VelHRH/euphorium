import joi from 'joi';

export const geminiValidationSchema = joi.object({
  GEMINI_API_KEY: joi.string().required(),
});

export const geminiConfig = () => ({
  apiKey: process.env.GEMINI_API_KEY,
});
