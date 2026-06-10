import { gqlRequest } from '@/utils/gql-request'
import type { GetEventInput, GetEventOutput } from 'shared'

const EVENT = `
  query Event($input: GetEventInput!) {
    event(input: $input) {
      id
      name
      description
    }
  }
`

export const getEventQuery = async (input: GetEventInput) =>
  gqlRequest<GetEventOutput>(EVENT, input)
