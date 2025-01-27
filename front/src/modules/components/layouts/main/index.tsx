import { Box } from '@mui/material'
import { FC } from 'react'

import Navbar from './Navbar'

import { LayoutProps } from '../types'

export const MainLayout: FC<LayoutProps> = ({ children }) => (
  <>
    <Navbar />
    <Box padding={3}>{children}</Box>
  </>
)
