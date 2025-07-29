'use client'

import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { SignUpInput, signUpInputSchema } from 'shared'
import { toast } from 'sonner'

import { SIGN_UP } from '$api/auth/queries/sign-up'
import { AuthForm } from '$components'
import { Routes } from '$config'
import { signUpFields } from '$constants'

export const SignUpForm = () => {
  const [signUp] = useMutation(SIGN_UP)
  const router = useRouter()

  const handleSignUp = async (credentials: SignUpInput) => {
    const { errors } = await signUp({ variables: { input: credentials } })

    if (errors) {
      toast.error(errors[0].message)

      return
    }

    router.push(Routes.LOGIN.url)
  }

  return (
    <AuthForm
      inputFields={signUpFields}
      schema={signUpInputSchema}
      onSubmit={handleSignUp}
    />
  )
}
