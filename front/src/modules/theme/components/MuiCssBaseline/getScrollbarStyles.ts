import { ThemeMode } from '$theme'

export const generateScrollbarStyles = (mode: ThemeMode) => {
  return {
    '*::-webkit-scrollbar': {
      width: '12px',
    },
    '*::-webkit-scrollbar-thumb': {
      borderRadius: '6px',
      backgroundColor: '#EC407A',
      border: `3px solid ${mode === ThemeMode.LIGHT ? '#FBFCFE' : '#090E10'}`,
    },
  }
}
