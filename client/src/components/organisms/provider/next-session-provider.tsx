'use client'

import { SessionProvider, SessionProviderProps } from 'next-auth/react'
import { FC, ReactNode } from 'react'

type NextSessionProviderProps = {
  children: ReactNode
} & SessionProviderProps

export const NextSessionProvider: FC<NextSessionProviderProps> = ({
  children,
  session,
}) => {
  return <SessionProvider {...session}>{children}</SessionProvider>
}
