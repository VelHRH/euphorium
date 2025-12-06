import { ref } from 'vue'
import { defineStore } from 'pinia'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>(Theme.LIGHT)

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
  }

  function toggleTheme() {
    theme.value = theme.value === Theme.DARK ? Theme.LIGHT : Theme.DARK
  }

  return { theme, setTheme, toggleTheme }
})
