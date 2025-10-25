import { graphql } from '$/lib/graphql'

export const GET_SONG = graphql(`
  query GetSong($input: GetSongInput!) {
    song(input: $input) {
      name
    }
  }
`)
