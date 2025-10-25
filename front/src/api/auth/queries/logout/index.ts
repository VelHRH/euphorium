import { graphql } from '$/lib/graphql'

export const LOGOUT = graphql(`
  mutation Logout {
    logout {
      success
    }
  }
`)
