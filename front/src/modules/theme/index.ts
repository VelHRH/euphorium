'use client'

import { createTheme } from '@mui/material'

import { generateComponents } from './components'
import { ThemeMode } from './constants'
import { generatePalette } from './palette'
import { typography } from './typography'

export const generateTheme = (mode: ThemeMode) =>
  createTheme({
    components: generateComponents(mode),
    palette: generatePalette(mode),
    typography,
  })

export * from './constants'
