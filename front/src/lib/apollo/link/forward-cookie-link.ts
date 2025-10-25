import { setContext } from '@apollo/client/link/context'

export const forwardCookieLink = setContext(async () => {
  return import('next/headers').then(async ({ cookies }) => {
    const browserCookies = await cookies()

    const cookie = browserCookies
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join(';')

    return {
      headers: {
        cookie,
      },
    }
  })
})
