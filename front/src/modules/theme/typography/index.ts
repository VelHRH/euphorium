import { Montserrat } from 'next/font/google'

const monserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const typography = {
  fontFamily: monserrat.style.fontFamily,
}
