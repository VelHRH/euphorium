import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { ReactNode } from 'react'
import { FieldValues } from 'react-hook-form'

import { PasswordAdornment } from './PasswordAdornment'
import { InputProps, InputType } from './types'
import { useLogic } from './useLogic'

export const Input = <Form extends FieldValues>(
  props: InputProps<Form>,
): ReactNode => {
  const {
    control,
    name,
    register,
    label,
    size,
    fullWidth,
    type = InputType.TEXT,
    isHelperTextEnabled = true,
    sx,
    ...restProps
  } = props

  const { value, onChange, error, inputType, showPassword, togglePassword } =
    useLogic({ control, name, type })

  return (
    <FormControl error={Boolean(error)} size={size} fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        onChange={onChange}
        value={value}
        label={label}
        color={Boolean(error) ? 'error' : undefined}
        fullWidth
        ref={register?.(name).ref}
        type={inputType}
        endAdornment={
          <PasswordAdornment
            togglePassword={togglePassword}
            showPassword={showPassword}
            type={type}
          />
        }
        sx={{
          ...sx,
          '& input::-ms-reveal, & input::-ms-clear': {
            display: 'none',
          },
          backgroundColor: 'background.default',
        }}
        {...restProps}
      />

      {isHelperTextEnabled && <FormHelperText>{error?.message}</FormHelperText>}
    </FormControl>
  )
}
