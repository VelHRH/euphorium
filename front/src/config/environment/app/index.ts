import { AppSchema } from './schema'

export const app: AppSchema = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
}
