'use client'

import { Book } from '@mui/icons-material'
import { Stack } from '@mui/material'
import { FieldValues } from 'react-hook-form'

import { Button, Input } from '$components'

import { AuthFormProps } from './types'
import { useLogic } from './useLogic'

export const AuthForm = <FormType extends FieldValues>(
  props: AuthFormProps<FormType>,
) => {
  const { inputFields, ...restProps } = props
  const { control } = useLogic(restProps)

  return (
    <Stack gap={2}>
      {Object.values(inputFields).map((inputField) => (
        <Input
          key={inputField.name}
          control={control}
          name={inputField.name}
          size="small"
          label={inputField.label}
          type={inputField.type}
          required
        />
      ))}
      <Button color="primary" variant="contained" endIcon={<Book />}>
        Submit
      </Button>
    </Stack>
  )
}
