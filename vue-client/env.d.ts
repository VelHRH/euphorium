/// <reference types="vite/client" />

declare global {
  namespace NodeJS {
    interface ImportMeta {
        env: {
          VITE_API_URL: string
          VITE_API_GRAPHQL_URL: string
        }
    }
  }
}

export {}