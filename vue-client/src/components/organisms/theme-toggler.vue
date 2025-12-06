<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import BaseButton from '../molecules/base-button.vue'

const themeStore = useThemeStore()

function toggleTheme() {
  themeStore.toggleTheme()
}
</script>

<template>
  <BaseButton @click="toggleTheme" label="Change theme" />
</template>
