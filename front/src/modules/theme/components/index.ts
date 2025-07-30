import { Components, Theme } from '@mui/material'

import { generateMuiCssBaseline } from './MuiCssBaseline'

import { ThemeMode } from '../constants/mode'

export const generateComponents = (
  mode: ThemeMode,
): Components<Omit<Theme, 'components'>> => ({
  MuiCssBaseline: generateMuiCssBaseline(mode),
})
