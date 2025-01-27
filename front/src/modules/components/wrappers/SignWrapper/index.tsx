import { Paper, Stack } from '@mui/material'
import { FC, PropsWithChildren } from 'react'

export const SignWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Paper
      elevation={5}
      sx={{
        width: '450px',
        paddingX: 5,
        paddingY: 5,
      }}
    >
      <Stack height="100%" justifyContent="space-between">
        {children}
      </Stack>
    </Paper>
  )
}
