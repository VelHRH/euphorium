import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, InputAdornment } from '@mui/material'
import { FC } from 'react'

import { InputType, InputTypes } from './types'

type Props = {
  togglePassword: () => void
  showPassword: boolean
  type: InputTypes
}

export const PasswordAdornment: FC<Props> = (props) => {
  const { togglePassword, showPassword, type } = props

  return (
    type === InputType.PASSWORD && (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={togglePassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    )
  )
}
