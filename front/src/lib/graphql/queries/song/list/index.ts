import { graphql } from '$/lib/graphql'

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
