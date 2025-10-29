import { Button } from '$components/ui/button'
import { useThemeStore } from '$modules/theme/store'
import { Theme } from '$modules/theme/types'
import { MoonIcon, SunIcon } from 'lucide-react'

export const ThemeToggler = () => {
  const { theme, toggleTheme } = useThemeStore()
  return (
    <Button variant="ghost" onClick={toggleTheme}>
      {theme === Theme.DARK ? (
        <SunIcon className="size-4" />
      ) : (
        <MoonIcon className="size-4" />
      )}
    </Button>
  )
}
