<script setup lang="ts">
import { computed } from 'vue'

const { name, description, similarity } = defineProps<{
  name: string
  description: string
  similarity: number
}>()

const matchPercent = computed(() => Math.round(similarity * 100))
</script>

<template>
  <article
    class="group bg-card/40 border-border hover:border-primary/40 hover:bg-card/70 rounded-xl border p-4 transition-colors"
  >
    <div class="flex items-start justify-between gap-4">
      <h3 class="group-hover:text-primary font-semibold leading-snug transition-colors">
        {{ name }}
      </h3>
      <span
        class="bg-primary/10 text-primary shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
      >
        {{ matchPercent }}% match
      </span>
    </div>
    <p class="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
      {{ description }}
    </p>
  </article>
</template>
