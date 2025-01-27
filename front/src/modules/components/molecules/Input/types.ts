import { OutlinedInputProps } from '@mui/material'
import { Control, FieldValues, Path, UseFormRegister } from 'react-hook-form'

export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
}

export type InputTypes = `${InputType}`

export type InputProps<Form extends FieldValues> = OutlinedInputProps & {
  name: Path<Form>
  control: Control<Form>
  register?: UseFormRegister<Form>
  type?: InputTypes
  isHelperTextEnabled?: boolean
}
