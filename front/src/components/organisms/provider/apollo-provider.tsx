'use client'

import { apolloClient } from '$lib/apollo'
import { ApolloProvider as ApolloProviderComponent } from '@apollo/client/react'
import { FC, ReactNode } from 'react'

export const ApolloProvider: FC<{
  children: ReactNode
}> = ({ children }) => (
  <ApolloProviderComponent client={apolloClient}>
    {children}
  </ApolloProviderComponent>
)
