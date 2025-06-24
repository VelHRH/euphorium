'use client'

import { signIn } from 'next-auth/react'

import { AuthForm, Button } from '$components'
import { loginFields } from '$constants'
import { Provider } from '$modules/api/auth/next-auth'
import { loginSchema } from '$validation'

export const LoginForm = () => {
  return (
    <>
      <AuthForm
        inputFields={loginFields}
        schema={loginSchema}
        onSubmit={async (credentials) => {
          await signIn(Provider.CREDENTIALS_LOGIN, credentials)
        }}
      />
      <Button
        onClick={async () => {
          await signIn(Provider.GOOGLE_LOGIN)
        }}
      >
        GOOGLE
      </Button>
    </>
  )
}
