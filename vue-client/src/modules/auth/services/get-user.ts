import type { GetUserOutput } from "shared"
import { fetchMe } from "../api/queries/me"

export async function getCurrentUser(): Promise<GetUserOutput | null> {
    try {
      const result = await fetchMe()
      return result || null
    } catch {
      return null
    }
  }