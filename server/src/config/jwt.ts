import joi from 'joi';

export const jwtValidationSchema = joi.object({
  SALT: joi.number().required().min(10),
});

export const jwtConfig = () => ({
  salt: Number(process.env.SALT),
});
