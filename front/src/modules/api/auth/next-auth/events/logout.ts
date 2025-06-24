import { EventCallbacks } from 'next-auth'

import { getApolloClient } from '$lib/apollo'

import { LOGOUT } from '../../queries'

export const logoutEvent: EventCallbacks['signOut'] = async () => {
  await getApolloClient().mutate({ mutation: LOGOUT })
}
