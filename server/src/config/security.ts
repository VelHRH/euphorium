import joi from 'joi';

export const securityValidationSchema = joi.object({
  ALLOWED_ORIGIN: joi.string().required(),
});

export const securityConfig = () => ({
  origin: process.env.ALLOWED_ORIGIN,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  password: {
    length: 12,
    numbers: true,
    symbols: true,
  },
});
