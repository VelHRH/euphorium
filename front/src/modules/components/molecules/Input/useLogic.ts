'use client'

import { useState } from 'react'
import { FieldValues, useController } from 'react-hook-form'

import { InputProps, InputType, InputTypes } from './types'

export const useLogic = <Form extends FieldValues>(
  params: InputProps<Form>,
) => {
  const { control, name, type } = params

  const [showPassword, setShowPassword] = useState<boolean>(
    type === InputType.TEXT,
  )

  const togglePassword = () => setShowPassword((prev) => !prev)

  const inputType: InputTypes = showPassword
    ? InputType.TEXT
    : InputType.PASSWORD

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ control, name })

  return {
    value,
    onChange,
    error,
    togglePassword,
    showPassword,
    inputType,
  }
}
