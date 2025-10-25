import { graphql } from '$/lib/graphql'

export const LOGIN = graphql(`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      email
    }
  }
`)
