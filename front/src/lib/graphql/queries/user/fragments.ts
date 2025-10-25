import { graphql } from '$/lib/graphql'

graphql(`
  fragment UserFields on ListUsersOutput {
    list {
      id
      email
    }
  }
`)
