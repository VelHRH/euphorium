import { graphql } from '$lib/apollo'

export const LOGIN = graphql(`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      email
    }
  }
`)
