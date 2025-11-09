import { AuthOptions } from 'next-auth'

export const loginCallback: Required<AuthOptions>['callbacks']['signIn'] =
  async (params) => {
    const { user } = params

    return Boolean(user)
  }
