'use client'

import { useRouter } from 'next/navigation'
import { SignUpInput } from 'shared'
import { toast } from 'sonner'

import { SIGN_UP } from '$api/auth/queries/sign-up'
import { Button } from '$components/ui/button'
import { Input } from '$components/ui/input'
import { Routes } from '$config/routes'
import { useMutation } from '@apollo/client/react'

export const SignUpForm = () => {
  const [signUp] = useMutation(SIGN_UP)
  const router = useRouter()

  const handleSignUp = async (credentials: SignUpInput) => {
    const { error } = await signUp({ variables: { input: credentials } })

    if (error) {
      toast.error(error.message)

      return
    }

    router.push(Routes.LOGIN.url)
  }

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        handleSignUp({
          email: (e.target as HTMLFormElement).email.value,
          password: (e.target as HTMLFormElement).password.value,
        })
      }}
    >
      <Input name="email" placeholder="Email" />
      <Input name="password" placeholder="Password" />
      <Button type="submit">Sign Up</Button>
    </form>
  )
}
