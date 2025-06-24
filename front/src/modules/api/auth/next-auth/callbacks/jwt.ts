import { AuthOptions } from 'next-auth'

export const jwtCallback: Required<AuthOptions>['callbacks']['jwt'] = async (
  params,
) => {
  const { user, token } = params

  return { ...token, ...user }
}
