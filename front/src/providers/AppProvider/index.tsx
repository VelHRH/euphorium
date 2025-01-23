import { FC, PropsWithChildren } from 'react'

import { ThemeProvider } from '../ThemeProvider'

export const AppProvider: FC<PropsWithChildren> = async (props) => {
  const { children } = props

  return <ThemeProvider>{children}</ThemeProvider>
}
