'use client'

import { useQuery } from '@apollo/client'
import { Typography } from '@mui/material'

import { GET_SONG } from '$graphql'

export default function Home() {
  const { loading, data, error } = useQuery(GET_SONG, {
    variables: { input: { name: 'La Noia' } },
  })

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  if (error || !data) {
    return <Typography>Error: {error?.message}</Typography>
  }

  return (
    <Typography fontWeight="bold" bgcolor="primary">
      {data.song.name}
    </Typography>
  )
}
