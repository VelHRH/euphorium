import { gqlRequest } from '@/utils/gql-request'
import type { LoginInput, LoginOutput } from 'shared'

const LOGIN = `
mutation Login($input: LoginInput!) {
  login(input: $input) {
    id
    email
  }
}
`

export const loginMutation = async (input: LoginInput) => gqlRequest<LoginOutput>(LOGIN, input)
