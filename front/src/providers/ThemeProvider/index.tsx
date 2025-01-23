import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { FC, PropsWithChildren } from 'react'

import { theme } from '$theme'

export const ThemeProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
