'use client'

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { FC, PropsWithChildren, useEffect } from 'react'

import { useStore } from '$store'
import {
  DEFAULT_THEME,
  generateTheme,
  LOCALSTORAGE_THEME_NAME,
  ThemeMode,
} from '$theme'

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const setThemeMode = useStore((state) => state.setThemeMode)
  const themeMode = useStore((state) => state.themeMode)

  useEffect(() => {
    const defaultThemeMode =
      (localStorage.getItem(LOCALSTORAGE_THEME_NAME) as ThemeMode) ||
      DEFAULT_THEME

    setThemeMode(defaultThemeMode)
  }, [])

  return (
    <MuiThemeProvider theme={generateTheme(themeMode)}>
      {children}
    </MuiThemeProvider>
  )
}
