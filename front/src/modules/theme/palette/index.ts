import createPalette from '@mui/material/styles/createPalette'

import { defaultTheme } from '../default'

export const palette = createPalette({
  ...defaultTheme.palette,
  primary: {
    main: '#212427',
    light: '#787D82',
  },
  secondary: {
    main: '#787D82',
    light: '#FDFDFD',
  },
  error: {
    main: '#E94036',
    light: '#FEEBEA',
  },
  warning: {
    main: '#ed6c02',
    light: '#e5a26a',
  },
  info: {
    main: '#0288d1',
    light: '#6babce',
  },
  success: {
    main: '#4FC6A8',
    light: '#E8FEF8',
  },
})
