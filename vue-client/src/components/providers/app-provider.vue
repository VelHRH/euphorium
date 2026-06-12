<script setup lang="ts">
import { useLocale } from '@/i18n/composables/use-locale.ts'
import ThemeProvider from './theme-provider.vue'

useLocale()
</script>

<template>
  <ThemeProvider>
    <slot />
  </ThemeProvider>
</template>
