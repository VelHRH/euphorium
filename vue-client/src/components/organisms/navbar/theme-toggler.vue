<script setup lang="ts">
import { useTheme } from '@/composables/use-theme'
import BaseButton from '../../molecules/base-button.vue'

const { toggleTheme } = useTheme()
</script>

<template>
  <BaseButton @click="toggleTheme" label="Change theme" />
</template>
