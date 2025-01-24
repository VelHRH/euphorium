import { FC, PropsWithChildren } from 'react'

import { ApolloProvider } from '../ApolloProvider'
import { ThemeProvider } from '../ThemeProvider'

export const AppProvider: FC<PropsWithChildren> = async (props) => {
  const { children } = props

  return (
    <ThemeProvider>
      <ApolloProvider>{children}</ApolloProvider>
    </ThemeProvider>
  )
}
