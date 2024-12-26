import joi from 'joi';

export type IdTokenPayload = {
  email: string;
};

export const googlePayloadSchema = joi.object<IdTokenPayload>({
  email: joi.string().email().required(),
});
