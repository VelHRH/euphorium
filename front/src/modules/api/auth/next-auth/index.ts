import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { Env, Routes } from '$config'

import { callbacks } from './callbacks'
import { Provider } from './constants'
import { credentialsLoginAuthorize } from './credentials-login'
import { events } from './events'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials SignIn',
      id: Provider.CREDENTIALS_LOGIN,
      credentials: {
        email: {},
        password: {},
      },
      authorize: credentialsLoginAuthorize,
    }),
  ],
  pages: {
    signIn: Routes.LOGIN.url,
  },
  secret: Env.auth.NEXTAUTH_SECRET,
  callbacks,
  events,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

export * from './constants'
