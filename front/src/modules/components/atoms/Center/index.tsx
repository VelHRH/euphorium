import { Stack } from '@mui/material'
import { FC, PropsWithChildren } from 'react'

export const Center: FC<PropsWithChildren> = (props) => {
  const { children } = props

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      {children}
    </Stack>
  )
}
