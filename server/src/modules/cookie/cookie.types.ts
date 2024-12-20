export type SetCookieParamsOptions = {
  expires?: Date;
  isHttpOnly?: boolean;
  isSecure?: boolean;
  isSigned?: boolean;
};

export type SetCookieParams = {
  name: string;
  options: SetCookieParamsOptions;
  value: string | null;
};

export type ClearCookieParams = Pick<SetCookieParams, 'name'>;
