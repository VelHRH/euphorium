'use client'

import { AuthForm } from '$components'
import { loginFields } from '$constants'
import { loginSchema } from '$validation'

export const LoginForm = () => {
  return (
    <AuthForm
      inputFields={loginFields}
      schema={loginSchema}
      onSubmit={() => Promise.resolve()}
    />
  )
}
