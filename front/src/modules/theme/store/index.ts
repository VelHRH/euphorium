import { create } from 'zustand'

import { DEFAULT_THEME, LOCALSTORAGE_THEME_NAME, ThemeMode } from '$theme'

type State = {
  themeMode: ThemeMode
}

type Actions = {
  setThemeMode: (newTheme: ThemeMode) => void
  toggleThemeMode: () => void
}

export const useStore = create<State & Actions>((set) => ({
  themeMode: DEFAULT_THEME,
  setThemeMode: (newTheme: ThemeMode) =>
    set(() => {
      localStorage.setItem(LOCALSTORAGE_THEME_NAME, newTheme)

      return { themeMode: newTheme }
    }),
  toggleThemeMode: () =>
    set((state) => {
      const isDarkMode = state.themeMode === ThemeMode.DARK
      const themeMode = isDarkMode ? ThemeMode.LIGHT : ThemeMode.DARK

      localStorage.setItem(LOCALSTORAGE_THEME_NAME, themeMode)

      return { themeMode }
    }),
}))
