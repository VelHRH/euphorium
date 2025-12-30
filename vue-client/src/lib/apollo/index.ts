import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_GRAPHQL_URL,
  credentials: 'include', // This enables sending cookies with requests
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
