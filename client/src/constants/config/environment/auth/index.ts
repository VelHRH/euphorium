import { AuthSchema } from './schema'

export const auth: AuthSchema = {
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
}
