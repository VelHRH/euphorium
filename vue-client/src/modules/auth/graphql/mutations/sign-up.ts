import { gql } from "graphql-tag";

export const SIGN_UP = gql`
mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    id
    email
  }
}
`