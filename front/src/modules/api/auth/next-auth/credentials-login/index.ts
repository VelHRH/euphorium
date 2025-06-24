import { CredentialsConfig } from 'next-auth/providers/credentials'

import { getApolloClient } from '$lib/apollo'

import { LOGIN } from '../../queries'

type Credentials = {
  email?: string
  password?: string
}

export const credentialsLoginAuthorize: CredentialsConfig['authorize'] = async (
  credentials?: Credentials,
) => {
  if (!credentials?.email || !credentials.password) {
    return null
  }

  const { email, password } = credentials

  const { data, errors } = await getApolloClient().mutate({
    mutation: LOGIN,
    variables: { input: { email, password } },
  })

  if (errors) {
    return null
  }

  if (!data?.login) {
    return null
  }

  const { id } = data.login

  return { id: String(id), email }
}
