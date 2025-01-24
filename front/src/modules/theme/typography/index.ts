import createTypography from '@mui/material/styles/createTypography'

import { defaultTheme } from '../default'
import { palette } from '../palette'

export const typography = createTypography(palette, {
  ...defaultTheme.typography,
  fontFamily: 'inherit',
  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightMedium: '700',
  fontWeightBold: '900',
})
