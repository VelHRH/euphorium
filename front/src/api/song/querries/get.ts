import { graphql } from '$lib/apollo'

export const GET_SONG = graphql(`
  query GetSong($input: GetSongInput!) {
    song(input: $input) {
      name
    }
  }
`)
