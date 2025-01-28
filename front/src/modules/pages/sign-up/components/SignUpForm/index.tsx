'use client'

import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'

import { SIGN_UP } from '$api/auth/queries/sign-up'
import { AuthForm } from '$components'
import { Routes } from '$config'
import { signUpFields } from '$constants'
import { SignUpFormType, signUpSchema } from '$validation'

export const SignUpForm = () => {
  const [signUp] = useMutation(SIGN_UP)
  const router = useRouter()

  const handleSignUp = async (credentials: SignUpFormType) => {
    const { errors } = await signUp({ variables: { input: credentials } })

    if (errors) {
      return
    }

    router.push(Routes.LOGIN.url)
  }

  return (
    <AuthForm
      inputFields={signUpFields}
      schema={signUpSchema}
      onSubmit={handleSignUp}
    />
  )
}
