import { Stack, Typography } from '@mui/material'
import { FC, Suspense } from 'react'

import { UserList } from './components/UserList'

export const UsersPage: FC = () => {
  return (
    <Stack>
      <Typography variant="h3" fontWeight="bold">
        All users
      </Typography>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <UserList />
      </Suspense>
    </Stack>
  )
}
