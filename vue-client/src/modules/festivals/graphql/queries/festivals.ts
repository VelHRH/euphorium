import { gql } from 'graphql-tag'

export const FESTIVALS = gql(`
  query Festivals($input: PaginationInput!) {
  festivals(input: $input) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        name
        imgPaths
        shows {
          name
        }
      }
      cursor
    }
  }
}
`)
