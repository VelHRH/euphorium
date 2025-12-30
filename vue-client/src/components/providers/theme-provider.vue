<script setup lang="ts">
import { Theme, useTheme } from '@/modules/theme/composables/use-theme'
import { onMounted, watch } from 'vue'

const { theme } = useTheme()

function updateTheme() {
  const root = document.documentElement

  if (theme.value === Theme.DARK) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

onMounted(() => {
  updateTheme()
})

watch(
  () => theme.value,
  () => {
    updateTheme()
  },
)
</script>

<template>
  <slot />
</template>
