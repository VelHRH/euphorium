<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import { ArrowUp, Loader2, Search } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSearchEvents } from '@/modules/events/composables/use-search-events'
import EventSearchResult from './event-search-result.vue'
import { showError } from '@/utils/show-error'

const query = ref('')
const textareaRef = useTemplateRef<HTMLTextAreaElement>('textareaRef')

const { data: results, isFetching, isSuccess, search, reset, error } = useSearchEvents()

watch(error, (err) => {
  if (err) showError('Search failed', err)
})

const canSubmit = computed(() => query.value.trim().length > 0 && !isFetching.value)
const hasResults = computed(() => isSuccess.value && (results.value?.length ?? 0) > 0)

const adjustHeight = () => {
  const el = textareaRef.value
  if (!el) return

  el.style.height = 'auto'
  el.style.height = `${Math.min(el.scrollHeight, 200)}px`
}

const handleInput = () => {
  adjustHeight()
}

const handleSubmit = () => {
  const trimmed = query.value.trim()
  if (!trimmed || isFetching.value) return

  search({ query: trimmed, limit: 10 })
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSubmit()
  }
}

const handleClear = () => {
  query.value = ''
  reset()
  nextTick(() => {
    adjustHeight()
    textareaRef.value?.focus()
  })
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-2xl flex-col gap-6">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-t2 font-bold tracking-tight">Find your next night</h1>
      <p class="text-muted-foreground text-body">
        Describe the vibe — we'll find matching events
      </p>
    </div>

    <div
      class="bg-card/60 border-border focus-within:border-ring/60 focus-within:ring-ring/30 rounded-2xl border shadow-lg backdrop-blur-sm transition-[box-shadow,border-color] focus-within:ring-[3px]"
    >
      <div class="flex items-start gap-3 px-4 pt-4">
        <Search class="text-muted-foreground mt-1 size-4 shrink-0" />
        <textarea
          ref="textareaRef"
          v-model="query"
          rows="1"
          placeholder="Techno warehouse party this Friday in Kyiv…"
          class="placeholder:text-muted-foreground min-h-[28px] w-full resize-none bg-transparent text-body leading-relaxed outline-none md:text-sm"
          :disabled="isFetching"
          @input="handleInput"
          @keydown="handleKeydown"
        />
      </div>

      <div class="flex items-center justify-between gap-3 px-3 pb-3 pt-2">
        <p class="text-muted-foreground pl-1 text-caption">
          <kbd class="bg-muted rounded px-1.5 py-0.5 text-caption">Enter</kbd>
          to search ·
          <kbd class="bg-muted rounded px-1.5 py-0.5 text-caption">Shift+Enter</kbd>
          new line
        </p>

        <Button
          type="button"
          size="icon"
          :disabled="!canSubmit"
          :class="cn('size-8 rounded-full transition-all', canSubmit && 'shadow-[0_0_12px_var(--neon-purple)]')"
          @click="handleSubmit"
        >
          <Loader2 v-if="isFetching" class="size-4 animate-spin" />
          <ArrowUp v-else class="size-4" />
        </Button>
      </div>
    </div>

    <div v-if="isFetching" class="flex flex-col gap-3">
      <div
        v-for="i in 3"
        :key="i"
        class="bg-muted/40 h-20 animate-pulse rounded-xl"
      />
    </div>

    <div v-else-if="isSuccess && results?.length === 0" class="text-center">
      <p class="text-muted-foreground text-sm">No events found. Try a different description.</p>
      <Button variant="ghost" size="sm" class="mt-2" @click="handleClear">Clear search</Button>
    </div>

    <div v-else-if="hasResults" class="flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <p class="text-muted-foreground text-sm">{{ results!.length }} results</p>
        <Button variant="ghost" size="sm" @click="handleClear">Clear</Button>
      </div>
      <EventSearchResult
        v-for="event in results"
        :key="event.item.id"
        :name="event.item.name"
        :description="event.item.description"
        :similarity="event.similarity"
      />
    </div>
  </div>
</template>
