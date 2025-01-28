declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // APP
      NEXT_PUBLIC_API_URL: string
      NEXT_PUBLIC_APP_URL: string
      NODE_ENV: 'development' | 'production'

      //AUTH
      NEXTAUTH_URL: string
      NEXTAUTH_SECRET: string
    }
  }
}

export {}
