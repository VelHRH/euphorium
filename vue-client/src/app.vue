<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppProvider from './components/providers/app-provider.vue'
import { useCurrentLayout } from './router/composables/use-current-layout'

const { currentLayout } = useCurrentLayout()
</script>

<template>
  <AppProvider>
    <component :is="currentLayout">
      <RouterView />
    </component>
  </AppProvider>
</template>
