import { cookies } from 'next/headers'
import { Session } from 'next-auth'

import { Env } from '$constants/config/environment'

export const getSessionUser = async () => {
  const cookieValues = await cookies()
  const Cookie = cookieValues.toString()

  const response = await fetch(
    Env.app.NEXT_PUBLIC_APP_URL.concat('/api/auth/session'),
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
