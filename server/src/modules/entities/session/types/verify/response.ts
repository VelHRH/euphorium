import { UserInGqlContext } from '$modules/app/types';
import { SingedTokens } from '$modules/token/types';

export type VerifyResponse = {
  tokens: SingedTokens;
  user: UserInGqlContext;
};
