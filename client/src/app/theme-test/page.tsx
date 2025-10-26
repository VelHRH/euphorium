'use client'

import { Button } from '$components/ui/button'
import { useThemeStore } from '$modules/theme/store'
import { Theme } from '$modules/theme/types'

export default function ThemeTestPage() {
  const { theme, setTheme, toggleTheme } = useThemeStore()

  return (
    <div className="p-8 bg-slate-500">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl text-red-500">Theme Store Test</h1>

        <div className="space-y-4">
          <p>
            Current theme: <strong>{theme}</strong>
          </p>

          <div className="flex gap-4">
            <Button
              onClick={() => setTheme(Theme.LIGHT)}
              variant={theme === Theme.LIGHT ? 'default' : 'outline'}
            >
              Light Theme
            </Button>

            <Button
              onClick={() => setTheme(Theme.DARK)}
              variant={theme === Theme.DARK ? 'default' : 'outline'}
            >
              Dark Theme
            </Button>

            <Button onClick={toggleTheme} variant="secondary">
              Toggle Theme
            </Button>
          </div>

          <div className="p-4 border rounded">
            <p>Theme value: {theme}</p>
            <p>Is Dark: {theme === Theme.DARK ? 'Yes' : 'No'}</p>
            <p>Is Light: {theme === Theme.LIGHT ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
