import { GqlContext } from '$modules/app/types';

export type SetCookieParamsOptions = {
  expires?: Date;
  isHttpOnly?: boolean;
  isSecure?: boolean;
  isSigned?: boolean;
};

export type SetParams = {
  name: string;
  options: SetCookieParamsOptions;
  response: GqlContext['res'];
  value: string | null;
};
