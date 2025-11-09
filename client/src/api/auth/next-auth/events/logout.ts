import { EventCallbacks } from 'next-auth'

import { apolloClient } from '$lib/apollo'
import { LOGOUT } from '../../queries'

export const logoutEvent: EventCallbacks['signOut'] = async () => {
  await apolloClient.mutate({ mutation: LOGOUT })
}
