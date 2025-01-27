import {
  alpha,
  PaletteColorOptions,
  TypeBackground,
  TypeText,
} from '@mui/material'
import { red } from '@mui/material/colors'

import { green, grey, primary, secondary, ThemeMode } from '../constants'

interface Palette {
  mode: ThemeMode
  primary: PaletteColorOptions
  secondary: PaletteColorOptions
  warning: PaletteColorOptions
  error: PaletteColorOptions
  success: PaletteColorOptions
  divider: string
  background: Partial<TypeBackground>
  text: Partial<TypeText>
}

export const generatePalette = (mode: ThemeMode): Palette => ({
  mode,
  primary: {
    light: primary[200],
    main: primary[500],
    dark: primary[800],
    contrastText: primary[50],
    ...(mode === ThemeMode.DARK && {
      contrastText: primary[100],
      light: primary[300],
      main: primary[400],
      dark: primary[800],
    }),
  },
  secondary: {
    light: secondary[300],
    main: secondary[500],
    dark: secondary[800],
    ...(mode === ThemeMode.DARK && {
      light: secondary[400],
      main: secondary[500],
      dark: secondary[900],
    }),
  },
  warning: {
    main: '#F7B538',
    dark: '#F79F00',
    ...(mode === ThemeMode.DARK && { main: '#F7B538', dark: '#F79F00' }),
  },
  error: {
    light: red[50],
    main: red[500],
    dark: red[700],
    ...(mode === ThemeMode.DARK && {
      light: red[400],
      main: red[500],
      dark: red[700],
    }),
  },
  success: {
    light: green[300],
    main: green[400],
    dark: green[800],
    ...(mode === ThemeMode.DARK && {
      light: green[400],
      main: green[500],
      dark: green[700],
    }),
  },
  divider:
    mode === ThemeMode.DARK ? alpha(grey[600], 0.3) : alpha(grey[300], 0.5),
  background: {
    default: grey[50],
    paper: grey[200],
    ...(mode === ThemeMode.DARK && { default: grey[900], paper: grey[800] }),
  },
  text: {
    primary: grey[900],
    secondary: grey[600],
    ...(mode === ThemeMode.DARK && {
      primary: grey[50],
      secondary: grey[400],
    }),
  },
})
