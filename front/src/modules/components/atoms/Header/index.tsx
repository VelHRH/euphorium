import { Stack, StackProps, Typography, TypographyProps } from '@mui/material'
import { FC, ReactNode } from 'react'

interface HeaderProps extends StackProps {
  children: ReactNode
  variant?: TypographyProps['variant']
}

export const Header: FC<HeaderProps> = ({
  children,
  sx,
  fontWeight = 'fontWeightBold',
  variant = 'h5',
  ...props
}) => (
  <Stack
    component="header"
    direction="row"
    alignItems="center"
    justifyContent="center"
    sx={sx}
    {...props}
  >
    <Typography fontWeight={fontWeight} variant={variant}>
      {children}
    </Typography>
  </Stack>
)
