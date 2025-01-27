'use client'

import { AuthForm } from '$components'
import { signUpFields } from '$constants'
import { signUpSchema } from '$validation'

export const SignUpForm = () => {
  return (
    <AuthForm
      inputFields={signUpFields}
      schema={signUpSchema}
      onSubmit={() => Promise.resolve()}
    />
  )
}
