import { graphql } from '$modules/graphql'

graphql(`
  fragment UserFields on UserEntity {
    id
    email
  }
`)
