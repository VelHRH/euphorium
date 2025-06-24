import { graphql } from '$graphql'

export const LOGOUT = graphql(`
  mutation Logout {
    logout
  }
`)
