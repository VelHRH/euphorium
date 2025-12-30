<script setup lang="ts">
import { Theme, useTheme } from '@/modules/theme/composables/use-theme'
import { onMounted, watch } from 'vue'

const { theme } = useTheme()

function updateTheme() {
  const root = document.documentElement

  if (theme.value === Theme.DARK) {
    root.setAttribute('data-theme', 'dark')
  } else {
    root.removeAttribute('data-theme')
  }
}

onMounted(() => {
  updateTheme()
})

watch(
  () => theme.value,
  () => {
    updateTheme()
  }
)
</script>

<template>
  <slot />
</template>
