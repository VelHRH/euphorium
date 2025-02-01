import { CssBaseline } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { getServerSession } from 'next-auth'
import { FC, PropsWithChildren } from 'react'

import { authOptions } from '$api/auth'

import { ApolloProvider } from '../ApolloProvider'
import { NextSessionProvider } from '../NextSessionProvider'
import { ThemeProvider } from '../ThemeProvider'

export const AppProvider: FC<PropsWithChildren> = async (props) => {
  const { children } = props
  const session = await getServerSession(authOptions)

  return (
    <NextSessionProvider session={session}>
      <AppRouterCacheProvider options={{ key: 'css' }}>
        <ApolloProvider>
          <ThemeProvider>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ApolloProvider>
      </AppRouterCacheProvider>
    </NextSessionProvider>
  )
}
