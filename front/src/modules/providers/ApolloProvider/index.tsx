'use client'

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support'
import { FC, PropsWithChildren } from 'react'

import { getApolloClient } from '$lib/apollo'

export const ApolloProvider: FC<PropsWithChildren> = ({ children }) => (
  <ApolloNextAppProvider makeClient={getApolloClient}>
    {children}
  </ApolloNextAppProvider>
)
