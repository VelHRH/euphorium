'use client'

import { Provider } from '$/api/auth/next-auth'
import { Button } from '$components/ui/button'
import { Input } from '$components/ui/input'
import { signIn } from 'next-auth/react'
import { FC } from 'react'

export const LoginForm: FC = () => {
  const handleSubmit = async (email: string, password: string) => {
    await signIn(Provider.CREDENTIALS_LOGIN, {
      email,
      password,
      redirect: false,
    })
  }

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(
          (e.target as HTMLFormElement).email.value,
          (e.target as HTMLFormElement).password.value,
        )
      }}
    >
      <Input name="email" placeholder="Email" />
      <Input name="password" placeholder="Password" />
      <Button type="submit">Login</Button>
    </form>
  )
}
