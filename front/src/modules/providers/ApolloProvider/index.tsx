'use client'

import { ApolloProvider as DefaultApolloProvider } from '@apollo/client'
import { FC, PropsWithChildren } from 'react'

import { client } from '$graphql'

export const ApolloProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props

  return (
    <DefaultApolloProvider client={client}>{children}</DefaultApolloProvider>
  )
}
