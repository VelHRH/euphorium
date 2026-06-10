<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppProvider from './components/providers/app-provider.vue'
import { useCurrentLayout } from './router/composables/use-current-layout'
import { Toaster } from 'vue-sonner';
import Background from './components/organisms/background.vue'

const { currentLayout } = useCurrentLayout()
</script>

<template>
  <AppProvider>
    <Background />
    <Toaster />
    <component :is="currentLayout">
      <RouterView />
    </component>
  </AppProvider>
</template>
