import { gqlRequest } from '@/utils/gql-request'
import type { SignUpInput, SignUpOutput } from 'shared'

export const SIGN_UP = `
mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    id
    email
  }
}
`

export const signUpMutation = async (input: SignUpInput) => gqlRequest<SignUpOutput>(SIGN_UP, input)
