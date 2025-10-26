import { Toaster } from 'sonner'

import { Provider } from '$components/organisms/provider'
import { Metadata } from 'next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head></head>
      <Provider>
        <body className="h-screen">
          {children}
          <Toaster richColors position="bottom-right" />
        </body>
      </Provider>
    </html>
  )
}

export const rootLayoutMetadata: Metadata = {
  title: 'New Blood',
  description: 'Welcome to New Blood',
  icons: [{ url: '/images/globe.png', sizes: 'any' }],
}
