import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import { searchEventsQuery } from '../api/queries/search-events'
import type { SearchEventOutput, SearchEventsOutput, SearchInput } from 'shared'

type SearchEventsResponse = {
  searchEvents?: SearchEventsOutput
} & Partial<SearchEventsOutput>

const extractEvents = (data: SearchEventsResponse): SearchEventOutput[] =>
  data.searchEvents?.events ?? data.events ?? []

export const useSearchEvents = () => {
  const searchInput = ref<SearchInput | null>(null)

  const query = useQuery({
    queryKey: computed(() => ['searchEvents', searchInput.value]),
    queryFn: async () => {
      const data = (await searchEventsQuery(searchInput.value!)) as SearchEventsResponse
      return extractEvents(data)
    },
    enabled: computed(() => searchInput.value !== null),
  })

  const search = (input: SearchInput) => {
    searchInput.value = input
  }

  const reset = () => {
    searchInput.value = null
  }

  return {
    ...query,
    search,
    reset,
  }
}
