'use client'

import DarkMode from '@mui/icons-material/DarkMode'
import WbSunny from '@mui/icons-material/WbSunny'
import { Box, Button, IconButton, Toolbar, useTheme } from '@mui/material'
import Link from 'next/link'

import { Routes } from '$config'
import { ThemeMode } from '$modules/theme'
import { useStore } from '$store'

export default function Navbar() {
  const theme = useTheme()

  const themeMode = useStore((state) => state.themeMode)
  const toggleThemeMode = useStore((state) => state.toggleThemeMode)

  return (
    <Box
      sx={{
        background: `${theme.palette.background.paper}99`,
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link href={Routes.HOME.url}>
            <Button>Home</Button>
          </Link>

          <Link href={Routes.USERS.url}>
            <Button>Users</Button>
          </Link>
        </Box>

        <Box>
          <IconButton onClick={toggleThemeMode} color="primary">
            {themeMode === ThemeMode.DARK ? <DarkMode /> : <WbSunny />}
          </IconButton>
          <Link href={Routes.LOGIN.url}>
            <Button>Login</Button>
          </Link>
          <Link href={Routes.SIGN_UP.url}>
            <Button variant="outlined" sx={{ ml: 1 }}>
              Sign Up
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </Box>
  )
}
