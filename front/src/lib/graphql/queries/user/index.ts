import { graphql } from '$/lib/graphql'

export const LIST_USERS = graphql(`
  query ListUsers {
    users {
      ...UserFields
    }
  }
`)
