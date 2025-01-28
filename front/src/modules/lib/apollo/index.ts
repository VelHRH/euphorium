import { ApolloLink } from '@apollo/client'
import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support'

import { forwardCookieLink, httpLink, ssrMultipartLink } from './link'

export const getApolloClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([ssrMultipartLink, forwardCookieLink, httpLink])
        : httpLink,
  })
