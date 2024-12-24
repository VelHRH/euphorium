declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // * App
      NODE_ENV: import('$config/constants').NodeEnv;
      PORT: string;
      DOMAIN: string;
      CONFIRMATION_TOKEN_EXPIRE_IN_S: number;

      // * Database
      DATABASE_URL: string;

      // * Crypto
      SALT: string;

      // * Cookies
      COOKIE_SECRET: string;

      // * Jwt
      ACCESS_TOKEN_SECRET: string;
      ACCESS_TOKEN_EXPIRE_IN_S: string;
      REFRESH_TOKEN_SECRET: string;
      REFRESH_TOKEN_EXPIRE_IN_S: string;

      // * Mail
      MAIL_PASS: string;
      MAIL_USER: string;
    }
  }
}

export {};
