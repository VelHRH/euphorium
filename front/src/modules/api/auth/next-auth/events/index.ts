import { EventCallbacks } from 'next-auth'

import { logoutEvent } from './logout'

export const events: Partial<EventCallbacks> = {
  signOut: logoutEvent,
}
