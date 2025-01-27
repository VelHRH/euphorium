import { ButtonProps } from '@mui/material'

export type Size = Required<ButtonProps>['size']

export const progressSizes: { [key in Size]: number } = {
  small: 16,
  medium: 20,
  large: 24,
}
