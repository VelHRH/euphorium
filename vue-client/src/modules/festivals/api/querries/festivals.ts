import { gqlRequest } from '@/utils/gql-request'
import type { ListFestivalsOutput, PaginationInput } from 'shared'

const FESTIVALS = `
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
`


export const fetchFestivals = async (input: PaginationInput) => {
   const result = await gqlRequest<{ festivals: ListFestivalsOutput }>(FESTIVALS, input)
   return result.festivals
}
