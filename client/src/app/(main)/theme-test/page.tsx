'use client'

import { Button } from '$components/ui/button'
import { Input } from '$components/ui/input'
import { useThemeStore } from '$modules/theme/store'
import { Theme } from '$modules/theme/types'

export default function ThemeTestPage() {
  const { theme, setTheme, toggleTheme } = useThemeStore()

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Festive palette in the style of your logo with automatic theme switching
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-card-foreground">Theme Controls</h2>
            <p className="text-muted-foreground">
              Current theme: <strong className="text-foreground">{theme}</strong>
            </p>

            <div className="flex gap-4 flex-wrap">
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

              <Button variant="destructive">
                Destructive Button
              </Button>

              <Button variant="ghost">
                Ghost Button
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-card-foreground">Form Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Enter text..." />
              <Input placeholder="Another field..." />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-card-foreground">Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary text-primary-foreground p-4 rounded text-center">
                Primary
              </div>
              <div className="bg-secondary text-secondary-foreground p-4 rounded text-center">
                Secondary
              </div>
              <div className="bg-muted text-muted-foreground p-4 rounded text-center">
                Muted
              </div>
              <div className="bg-accent text-accent-foreground p-4 rounded text-center">
                Accent
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded border border-border">
            <h4 className="font-semibold text-foreground mb-2">Theme Information</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>Theme value: <code className="bg-background px-1 rounded text-foreground">{theme}</code></li>
              <li>Dark theme: {theme === Theme.DARK ? '✅ Yes' : '❌ No'}</li>
              <li>Light theme: {theme === Theme.LIGHT ? '✅ Yes' : '❌ No'}</li>
              <li>Automatic switching: ✅ Enabled</li>
            </ul>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <h3 className="text-xl font-semibold text-card-foreground">🌈 Neon Palette</h3>
          <p className="text-muted-foreground">
            Festive neon colors in your logo style
          </p>
          
          {/* Neon colors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              className="p-4 rounded-lg text-center text-white font-semibold shadow-lg"
              style={{ backgroundColor: 'var(--neon-blue)' }}
            >
              Neon Blue
            </div>
            <div 
              className="p-4 rounded-lg text-center text-white font-semibold shadow-lg"
              style={{ backgroundColor: 'var(--neon-purple)' }}
            >
              Neon Purple
            </div>
            <div 
              className="p-4 rounded-lg text-center text-white font-semibold shadow-lg"
              style={{ backgroundColor: 'var(--neon-pink)' }}
            >
              Neon Pink
            </div>
            <div 
              className="p-4 rounded-lg text-center text-white font-semibold shadow-lg"
              style={{ backgroundColor: 'var(--neon-cyan)' }}
            >
              Neon Cyan
            </div>
          </div>

          {/* Gradient Buttons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-card-foreground">Gradient Elements</h4>
            <div className="flex gap-4 flex-wrap">
              <button 
                className="px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
                }}
              >
                Blue → Purple
              </button>
              <button 
                className="px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))',
                }}
              >
                Purple → Pink
              </button>
              <button 
                className="px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-blue))',
                }}
              >
                Cyan → Blue
              </button>
            </div>
          </div>

          {/* Neon Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="p-6 rounded-lg border-2 shadow-lg"
              style={{ 
                borderColor: 'var(--neon-blue)',
                boxShadow: '0 0 20px var(--neon-blue)33'
              }}
            >
              <h5 className="font-semibold text-card-foreground mb-2">Neon Card</h5>
              <p className="text-muted-foreground">Card with neon blue glow</p>
            </div>
            <div 
              className="p-6 rounded-lg border-2 shadow-lg"
              style={{ 
                borderColor: 'var(--neon-purple)',
                boxShadow: '0 0 20px var(--neon-purple)33'
              }}
            >
              <h5 className="font-semibold text-card-foreground mb-2">Purple Glow</h5>
              <p className="text-muted-foreground">Card with neon purple glow</p>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p><strong>The neon palette includes:</strong></p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Blue neon (264° hue) - main logo color</li>
              <li>Purple neon (320° hue) - transition color</li>
              <li>Pink neon (340° hue) - accent color</li>
              <li>Cyan neon (195° hue) - additional color</li>
              <li>Gradients and neon effects for festivities</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-muted-foreground">
          <p>All colors automatically adjust to the selected theme</p>
          <p>No dark: prefixes required! 🎉</p>
          <p className="mt-2 text-sm">Using the modern OKLCH color space</p>
        </div>
      </div>
    </div>
  )
}
