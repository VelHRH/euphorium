import { graphql } from '$lib/apollo'

export const LIST_USERS = graphql(`
  query ListUsers {
    users {
      ...UserFields
    }
  }
`)
