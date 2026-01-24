import { useQuery } from "@tanstack/vue-query"
import { fetchFestivals } from "../api/querries/festivals"
import type { PaginationInput } from "shared"

export const useFetchFestivals = (input: PaginationInput = {}) => {
  return useQuery({
    queryKey: ['festivals'],
    queryFn: () => fetchFestivals(input),
  })
}