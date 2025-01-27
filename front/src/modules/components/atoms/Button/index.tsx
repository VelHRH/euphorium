import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material'
import { FC } from 'react'

import { Loading } from '../Loading'

type Props = MuiButtonProps
export const Button: FC<Props> = (props) => {
  const {
    children,
    loading,
    startIcon,
    size = 'medium',
    disabled,
    ...restProps
  } = props

  return (
    <MuiButton
      type="submit"
      size={size}
      startIcon={loading ? <Loading size={size} /> : startIcon}
      disabled={disabled || Boolean(loading)}
      sx={{ fontWeight: 'bold' }}
      {...restProps}
    >
      {children}
    </MuiButton>
  )
}
