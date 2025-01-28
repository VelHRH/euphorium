'use client'

import { Stack } from '@mui/material'
import { FieldValues, Form, FormSubmitHandler } from 'react-hook-form'

import { Button, Input } from '$components'

import { AuthFormProps } from './types'
import { useLogic } from './useLogic'

export const AuthForm = <FormType extends FieldValues>(
  props: AuthFormProps<FormType>,
) => {
  const { inputFields, ...restProps } = props
  const { control, onFormSubmit, isValid } = useLogic(restProps)

  return (
    <Form
      control={control}
      onSubmit={
        onFormSubmit as FormType extends FieldValues
          ? FormSubmitHandler<FormType>
          : FormSubmitHandler<FormType>
      }
    >
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
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={!isValid}
        >
          Submit
        </Button>
      </Stack>
    </Form>
  )
}
