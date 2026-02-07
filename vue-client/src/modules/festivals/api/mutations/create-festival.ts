import { gqlRequest } from '@/utils/gql-request'
import type { CreateFestivalInput, CreateFestivalOutput } from 'shared'

const CREATE_FESTIVAL = `
  mutation CreateFestival($input: CreateFestivalInput!) {
    createFestival(input: $input) {
      id
      name
      dateStart
      dateEnd
      imgPaths
    }
  }
`

export const createFestivalMutation = async (input: CreateFestivalInput) => {
  const result = await gqlRequest<{ createFestival: CreateFestivalOutput }>(CREATE_FESTIVAL, input)
  return result.createFestival
}

