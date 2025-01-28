import { cookies } from 'next/headers'
import { Session } from 'next-auth'

import { Env } from '$config'

export const getSessionUser = async () => {
  const cookieValues = cookies()
  const Cookie = cookieValues.toString()

  const response = await fetch(
    Env.auth.NEXTAUTH_URL.concat('/api/auth/session'),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie,
      },
    },
  )

  const session: Session = await response.json()

  return session?.user
}
