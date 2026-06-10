import { gqlRequest } from '@/utils/gql-request'
import type { SearchEventsOutput, SearchInput } from 'shared'

const SEARCH_EVENTS = `
query SearchEvents($input: SearchInput!) {
  searchEvents(input: $input) {
    events {
      similarity
      item {
        id
        name
        description
      }
    }
  }
}
`

export const searchEventsQuery = async (input: SearchInput) =>
  gqlRequest<SearchEventsOutput>(SEARCH_EVENTS, input)
