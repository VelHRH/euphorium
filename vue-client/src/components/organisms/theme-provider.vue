<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useThemeStore, Theme } from '@/stores/theme'

const themeStore = useThemeStore()

function updateTheme() {
  const root = document.documentElement

  if (themeStore.theme === Theme.DARK) {
    root.setAttribute('data-theme', 'dark')
  } else {
    root.removeAttribute('data-theme')
  }
}

onMounted(() => {
  updateTheme()
})

watch(
  () => themeStore.theme,
  () => {
    updateTheme()
  },
)
</script>

<template>
  <slot />
</template>
