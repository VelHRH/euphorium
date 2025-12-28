<script setup lang="ts">
import ThemeProvider from './theme-provider.vue'
</script>

<template>
  <ThemeProvider>
    <slot />
  </ThemeProvider>
</template>
