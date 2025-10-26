import { graphql } from '$lib/apollo'

export const GOOGLE_LOGIN = graphql(`
  mutation GoogleLogin($input: GoogleLoginInput!) {
    googleLogin(input: $input) {
      id
      email
    }
  }
`)
