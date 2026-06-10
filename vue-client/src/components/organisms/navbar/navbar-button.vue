<script setup lang="ts">
import { computed } from 'vue'

interface NavbarButtonProps {
  label: string
  path: string
  isGhost?: boolean
}

const { label, path, isGhost } = defineProps<NavbarButtonProps>()

const buttonClasses = computed(() => {
  const baseClasses =
    'px-4 py-2 rounded-md font-medium transition-colors duration-200 cursor-pointer text-body'

  if (isGhost) {
    return [
      baseClasses,
      'text-foreground hover:bg-muted/50'
    ]
      .filter(Boolean)
      .join(' ')
  }

  return [baseClasses, 'bg-primary/0 text-primary hover:bg-primary/25'].join(' ')
})
</script>

<template>
  <RouterLink :class="buttonClasses" :to="path">
    {{ label }}
  </RouterLink>
</template>
