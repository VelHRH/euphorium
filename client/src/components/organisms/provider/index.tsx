import { authOptions } from '$api/auth/next-auth'
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'
import { ApolloProvider } from './apollo-provider'
import { NextSessionProvider } from './next-session-provider'
import { ThemeProvider } from './theme-provider'

export const Provider = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions)
  return (
    <NextSessionProvider session={session}>
      <ApolloProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ApolloProvider>
    </NextSessionProvider>
  )
}
