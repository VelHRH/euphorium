'use client'

import { signIn } from 'next-auth/react'
import { FC } from 'react'
import { loginInputSchema } from 'shared'
import { toast } from 'sonner'

import { AuthForm, Button } from '$components'
import { loginFields } from '$constants'
import { Provider } from '$modules/api/auth/next-auth'

export const LoginForm: FC = () => {
  return (
    <>
      <AuthForm
        inputFields={loginFields}
        schema={loginInputSchema}
        onSubmit={async (credentials) => {
          const result = await signIn(Provider.CREDENTIALS_LOGIN, {
            ...credentials,
            redirect: false,
          })

          if (result?.error) {
            toast.error('Invalid email or password')
          }
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
