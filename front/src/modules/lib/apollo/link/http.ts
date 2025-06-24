import { HttpLink } from '@apollo/client'
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies'

import { Env } from '$config'

export const httpLink = new HttpLink({
  uri: Env.app.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  fetch: async (uri, options) => {
    const isServerSide = typeof window === 'undefined'
    const response = await fetch(uri, options)

    if (isServerSide && response.ok) {
      try {
        const { cookies } = await import('next/headers')
        const serverCookies = await cookies()

        const setCookies = new ResponseCookies(response.headers)
        const cookie = setCookies.getAll()

        cookie.forEach((cookieObject) => {
          const { name, value, ...restOptions } = cookieObject

          serverCookies.set(name, value, restOptions)
        })
      } catch {
        return response
      }
    }

    return response
  }, // This is needed to pass cookies from next-auth
})
