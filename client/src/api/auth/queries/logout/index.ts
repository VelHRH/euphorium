import { graphql } from '$lib/apollo'

export const LOGOUT = graphql(`
  mutation Logout {
    logout {
      success
    }
  }
`)
