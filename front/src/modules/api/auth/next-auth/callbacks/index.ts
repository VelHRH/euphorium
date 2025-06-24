import { AuthOptions } from 'next-auth'

import { jwtCallback } from './jwt'
import { loginCallback } from './login'
import { redirectCallback } from './redirect'
import { sessionCallback } from './session'

export const callbacks: Required<AuthOptions>['callbacks'] = {
  signIn: loginCallback,
  redirect: redirectCallback,
  jwt: jwtCallback,
  session: sessionCallback,
}
