'use client'

import { useQuery } from '@apollo/client'
import { Typography } from '@mui/material'
import { FC } from 'react'

import { GET_SONG } from '$graphql'

export const HomePage: FC = () => {
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
    <>
      <Typography height={11111}>{data.song.name}</Typography>
    </>
  )
}
