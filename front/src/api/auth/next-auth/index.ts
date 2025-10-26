import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { Env } from '$constants/config/environment'
import { Routes } from '$constants/config/routes'

import { callbacks } from './callbacks'
import { Provider } from './constants/providers'
import { credentialsLoginAuthorize } from './credentials-login'
import { events } from './events'
import { googleProfile } from './google-login'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: Provider.CREDENTIALS_LOGIN,
      name: 'Credentials Login',
      credentials: {
        email: {},
        password: {},
      },
      authorize: credentialsLoginAuthorize,
    }),
    GoogleProvider({
      id: Provider.GOOGLE_LOGIN,
      name: 'Google Login',
      clientId:
        '391379664732-5fj8pslqcfmf5ktcnnuha39bi5hfvhb5.apps.googleusercontent.com',
      clientSecret: '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',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      profile: googleProfile,
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
