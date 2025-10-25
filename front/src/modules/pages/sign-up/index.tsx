
import { FC } from 'react'


import { SignUpForm } from './components'

export const SignUpPage: FC = () => {
  return (
    <div className="p-3 max-w-800px mx-auto">
      <div className="flex flex-col gap-2 items-center justify-center">
        <p className="text-2xl font-bold">
          Sign Up
        </p>
        <SignUpForm />
      </div>
    </div>
  )
}
