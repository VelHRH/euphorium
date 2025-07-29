import { FC } from 'react'
import { Toaster } from 'sonner'

import { AppProvider } from '$components/providers'

import { LayoutProps } from '../types'

export const RootLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <html>
      <head></head>
      <AppProvider>
        <body
          style={{
            height: '100vh',
          }}
        >
          {children}
          <Toaster richColors position="bottom-right" />
        </body>
      </AppProvider>
    </html>
  )
}

export * from './metadata'
