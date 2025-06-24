import { AuthOptions } from 'next-auth'

export const sessionCallback: Required<AuthOptions>['callbacks']['session'] = (
  params,
) => {
  const { session, token } = params

  if (token) {
    session.user = token
  }

  return session
}
