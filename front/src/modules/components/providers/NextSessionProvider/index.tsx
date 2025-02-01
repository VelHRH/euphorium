'use client'

import { SessionProvider, SessionProviderProps } from 'next-auth/react'
import { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren<SessionProviderProps>

export const NextSessionProvider: FC<Props> = (props) => {
  const { children, ...restProps } = props

  return <SessionProvider {...restProps}>{children}</SessionProvider>
}
