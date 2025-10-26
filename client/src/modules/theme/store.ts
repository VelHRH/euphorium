import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Theme, type ThemeStore } from './types'

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: Theme.DARK,

      setTheme: (theme: Theme) => {
        console.log('Setting theme:', theme)
        set({ theme })
      },

      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
        get().setTheme(newTheme)
      },
    }),
    {
      name: 'theme-storage',
    },
  ),
)
