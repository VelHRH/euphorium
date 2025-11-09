import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'

import { httpLink } from './link/http'

export const apolloClient = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
  defaultOptions: {
    mutate: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
    watchQuery: {
      errorPolicy: 'all',
    },
  },
})

export * from './graphql-codegen/__generated__'
