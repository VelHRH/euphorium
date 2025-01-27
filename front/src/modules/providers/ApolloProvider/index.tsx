'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support'

import { Env } from '$config'

const forwardCookieLink = setContext(async () => {
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

function makeClient() {
  const httpLink = new HttpLink({
    uri: Env.app.NEXT_PUBLIC_API_URL,
    credentials: 'include',
    fetchOptions: { cache: 'no-store' },
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            forwardCookieLink,
            httpLink,
          ])
        : httpLink,
  })
}

export function ApolloProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
