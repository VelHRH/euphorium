<script setup lang="ts">
import { Theme, useTheme } from '@/modules/theme/composables/use-theme'
import { Button } from '@/components/ui/button'
import { SunIcon, MoonIcon } from 'lucide-vue-next'

const { toggleTheme, theme } = useTheme()
</script>

<template>
  <Button variant="ghost" @click="toggleTheme">
    <SunIcon v-if="theme === Theme.LIGHT" />
    <MoonIcon v-else />
  </Button>
</template>
