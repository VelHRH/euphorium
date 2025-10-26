import { graphql } from '$lib/apollo'

export const DELETE_SONG = graphql(`
  mutation DeleteSong($input: DeleteSongInput!) {
    deleteSong(input: $input) {
      success
      id
    }
  }
`)
