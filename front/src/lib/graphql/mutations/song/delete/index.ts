import { graphql } from '$/lib/graphql'

export const DELETE_SONG = graphql(`
  mutation DeleteSong($input: DeleteSongInput!) {
    deleteSong(input: $input) {
      success
    }
  }
`)
