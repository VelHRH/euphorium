import joi from 'joi';

export const jwtValidationSchema = joi.object({
  SALT: joi.number().required().min(10),
  ACCESS_TOKEN_SECRET: joi.string().required().min(32),
  REFRESH_TOKEN_SECRET: joi.string().required().min(32),
  ACCESS_TOKEN_EXPIRE_IN_S: joi.number().required().min(300),
  REFRESH_TOKEN_EXPIRE_IN_S: joi.number().required().min(604800),
});

export const jwtConfig = () => ({
  accessToken: {
    cookieName: 'x-access-token',
    secret: process.env.ACCESS_TOKEN_SECRET,
    expireIn: Number(process.env.ACCESS_TOKEN_EXPIRE_IN_S),
  },
  refreshToken: {
    cookieName: 'x-refresh-token',
    secret: process.env.REFRESH_TOKEN_SECRET,
    expireIn: Number(process.env.REFRESH_TOKEN_EXPIRE_IN_S),
  },
  salt: Number(process.env.SALT),
});
