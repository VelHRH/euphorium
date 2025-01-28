import { graphql } from '$graphql'

export const LOGIN = graphql(`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      email
    }
  }
`)
