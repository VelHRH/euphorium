import { graphql } from '$lib/apollo'

export const LIST_SONGS = graphql(`
  query ListSongs {
    songs {
      id
      name
      createdAt
      updatedAt
    }
  }
`)
