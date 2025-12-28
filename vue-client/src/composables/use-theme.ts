import { useStorage } from '@vueuse/core'
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export const useTheme = () => {
  const theme = useStorage<Theme>('theme', Theme.LIGHT)

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
  }

  function toggleTheme() {
    console.log('toggleTheme', theme.value)
    theme.value = theme.value === Theme.DARK ? Theme.LIGHT : Theme.DARK
  }

  return { theme, setTheme, toggleTheme }
}
