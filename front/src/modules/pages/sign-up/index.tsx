import { Stack } from '@mui/material'
import { FC } from 'react'

import { Center, Header, SignWrapper } from '$components'

import { SignUpForm } from './components'

export const SignUpPage: FC = () => {
  return (
    <Center>
      <SignWrapper>
        <Stack gap={2}>
          <Header>Sign Up</Header>
          <SignUpForm />
        </Stack>
      </SignWrapper>
    </Center>
  )
}
