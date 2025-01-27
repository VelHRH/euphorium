import { graphql } from '$modules/graphql'

export const LIST_USERS = graphql(`
  query ListUsers {
    users {
      ...UserFields
    }
  }
`)
