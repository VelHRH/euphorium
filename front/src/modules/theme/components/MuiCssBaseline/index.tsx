import { Components, Theme } from '@mui/material'

import { generateScrollbarStyles } from './getScrollbarStyles'

import { ThemeMode } from '../../mode'

export const generateMuiCssBaseline = (
  mode: ThemeMode,
): Components<Theme>['MuiCssBaseline'] => ({
  styleOverrides: {
    '*': {
      ...generateScrollbarStyles(mode),
    },
  },
})
