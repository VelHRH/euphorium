declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // App
      NEXT_PUBLIC_API_URL: string
      NEXT_PUBLIC_APP_URL: string
      NODE_ENV: 'development' | 'production'
    }
  }
}

export {}
