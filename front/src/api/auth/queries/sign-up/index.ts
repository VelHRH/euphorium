import { graphql } from '$lib/apollo'

export const SIGN_UP = graphql(`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      id
      email
    }
  }
`)
