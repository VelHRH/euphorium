import { Card, CardContent, Typography } from '@mui/material'
import { FC } from 'react'

interface Props {
  email: string
}

export const UserListItem: FC<Props> = ({ email }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 1,
        gap: 2,
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography>{email}</Typography>
      </CardContent>
    </Card>
  )
}
