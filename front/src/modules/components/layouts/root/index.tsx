import { FC } from 'react'

import { AppProvider } from '$providers'

import { LayoutProps } from '../types'

export const RootLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <html>
      <head></head>
      <body
        style={{
          height: '100vh',
        }}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}

export * from './metadata'
