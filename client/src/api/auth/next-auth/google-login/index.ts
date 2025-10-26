import { GoogleProfile } from 'next-auth/providers/google'
import { OAuthConfig } from 'next-auth/providers/oauth'

import { apolloClient } from '$lib/apollo'

import { GOOGLE_LOGIN } from '../../queries/google-login'

export const googleProfile: OAuthConfig<GoogleProfile>['profile'] = async (
  _profile,
  tokens,
) => {
  if (tokens.id_token) {
    const { id_token: idToken } = tokens

    const { error, data } = await apolloClient.mutate({
      mutation: GOOGLE_LOGIN,
      variables: { input: { idToken } },
    })

    if (data?.googleLogin && !error) {
      const { id, email } = data.googleLogin

      return { id: String(id), email }
    }
  }

  return { id: 'NULL' }
}
