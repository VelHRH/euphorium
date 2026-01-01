<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface NavbarButtonProps {
  label: string
  path: string
  isGhost?: boolean
}

const { label, path, isGhost } = defineProps<NavbarButtonProps>()

const route = useRoute()

const isActive = computed(() => {
  return route.path.includes(path)
})

const buttonClasses = computed(() => {
  const baseClasses =
    'px-4 py-2 rounded-full font-medium transition-colors duration-200 cursor-pointer'

  if (isGhost) {
    return [
      baseClasses,
      'text-foreground hover:bg-muted/50',
      isActive.value && 'bg-primary/20 text-primary',
    ]
      .filter(Boolean)
      .join(' ')
  }

  return [baseClasses, 'bg-primary text-background hover:bg-primary/90'].join(' ')
})
</script>

<template>
  <RouterLink :class="buttonClasses" :to="path">
    {{ label }}
  </RouterLink>
</template>
