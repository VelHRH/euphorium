import { GoogleProfile } from 'next-auth/providers/google'
import { OAuthConfig } from 'next-auth/providers/oauth'

import { getApolloClient } from '$modules/lib/apollo'

import { GOOGLE_LOGIN } from '../../queries/google-login'

export const googleProfile: OAuthConfig<GoogleProfile>['profile'] = async (
  _profile,
  tokens,
) => {
  if (tokens.id_token) {
    const { id_token: idToken } = tokens

    const { errors, data } = await getApolloClient().mutate({
      mutation: GOOGLE_LOGIN,
      variables: { input: { idToken } },
    })

    if (data?.googleLogin && !errors) {
      const { id, email } = data.googleLogin

      return { id: String(id), email }
    }
  }

  return { id: 'NULL' }
}
