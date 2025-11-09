export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}
