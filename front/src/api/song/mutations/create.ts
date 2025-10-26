import { graphql } from '$lib/apollo'

export const CREATE_SONG = graphql(`
  mutation CreateSong($input: CreateSongInput!) {
    createSong(input: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`)
