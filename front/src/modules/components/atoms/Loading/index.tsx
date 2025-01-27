import { CircularProgress } from '@mui/material'
import { FC } from 'react'

import { progressSizes, Size } from './progressSize'

type Props = {
  size: Size
}

export const Loading: FC<Props> = ({ size }) => (
  <CircularProgress size={progressSizes[size]} color="inherit" />
)
