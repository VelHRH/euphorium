import { FC } from 'react'
import { LoginForm } from '../components/login-form'

export const LoginPage: FC = () => {
  return (
    <div className="p-3 max-w-800px mx-auto">
      <div className="flex flex-col gap-2 items-center justify-center">
        <p className="text-2xl font-bold">Login</p>
        <LoginForm />
      </div>
    </div>
  )
}
