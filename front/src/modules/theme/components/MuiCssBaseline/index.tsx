import { Components, Theme } from '@mui/material'

import { ThemeMode } from '$modules/theme/constants'

import { generateScrollbarStyles } from './getScrollbarStyles'

export const generateMuiCssBaseline = (
  mode: ThemeMode,
): Components<Theme>['MuiCssBaseline'] => ({
  styleOverrides: {
    '*': {
      ...generateScrollbarStyles(mode),
    },
  },
})
