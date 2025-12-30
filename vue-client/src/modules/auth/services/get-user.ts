import { apolloClient } from "@/lib/apollo"
import { ME } from "../graphql/queries"
import type { GetUserOutput } from "shared"

export async function getCurrentUser(): Promise<GetUserOutput | null> {
    try {
      const result = await apolloClient.query({
        query: ME,
        errorPolicy: 'ignore',
        fetchPolicy: 'network-only',
      })
      return result.data?.me || null
    } catch {
      return null
    }
  }