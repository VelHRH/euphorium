import { Stack } from '@mui/material'
import { FC } from 'react'

import { Center, Header, SignWrapper } from '$components'

import { LoginForm } from './components'

export const LoginPage: FC = () => {
  return (
    <Center>
      <SignWrapper>
        <Stack gap={2}>
          <Header>Login</Header>
          <LoginForm />
        </Stack>
      </SignWrapper>
    </Center>
  )
}
