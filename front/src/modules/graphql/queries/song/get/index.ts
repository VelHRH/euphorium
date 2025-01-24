import { graphql } from '$modules/graphql'

export const GET_SONG = graphql(`
  query GetSong($input: GetSongInput!) {
    song(input: $input) {
      name
    }
  }
`)
