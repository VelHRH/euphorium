import { graphql } from '$modules/graphql'

graphql(`
  fragment UserFields on ListUsersOutput {
    list {
      id
      email
    }
  }
`)
