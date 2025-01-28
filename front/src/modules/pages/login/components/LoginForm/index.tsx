'use client'

import { signIn } from 'next-auth/react'

import { AuthForm } from '$components'
import { loginFields } from '$constants'
import { Provider } from '$modules/api/auth/next-auth'
import { loginSchema } from '$validation'

export const LoginForm = () => {
  return (
    <AuthForm
      inputFields={loginFields}
      schema={loginSchema}
      onSubmit={async (credentials) => {
        await signIn(Provider.CREDENTIALS_LOGIN, {
          ...credentials,
        })
      }}
    />
  )
}
