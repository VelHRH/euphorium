import { GqlContext } from '$modules/app/types';

export type VerifyParams = {
  response?: GqlContext['res'];
  signedAccessToken?: string;
  signedRefreshToken?: string;
};
