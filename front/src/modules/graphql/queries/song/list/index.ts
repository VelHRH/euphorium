import { graphql } from '$graphql'

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
