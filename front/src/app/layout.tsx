'use client '

import { AppProvider } from '$providers'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <AppProvider>
        <body>{children}</body>
      </AppProvider>
    </html>
  )
}
