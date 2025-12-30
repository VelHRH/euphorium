import { gql } from "graphql-tag";

export const LOGIN = gql`
mutation Login($input: LoginInput!) {
  login(input: $input) {
    id
    email
  }
}
`