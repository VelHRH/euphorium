declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // * App
      NODE_ENV: import('$config/constants').NodeEnv;
      PORT: string;
      DOMAIN: string;

      // * Database
      DATABASE_URL: string;
    }
  }
}

export {};
