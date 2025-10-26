'use client'

import { useThemeStore } from '$modules/theme/store'
import { Theme } from '$modules/theme/types'
import { useEffect } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    
    if (theme === Theme.DARK) {
      root.setAttribute('data-theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
    }
  }, [theme])

  return <>{children}</>
}
