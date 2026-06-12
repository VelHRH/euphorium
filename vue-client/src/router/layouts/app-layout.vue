<script setup lang="ts">
import NavBarPanel from '@/components/organisms/navbar/navbar-panel.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div className="px-2 min-h-screen flex flex-col">
    <NavBarPanel />
    <div className="mt-22"></div>
    <div className="min-h-[calc(100vh-9.25rem)]"><slot /></div>
    <div className="py-4 mt-4">
        <p className="text-muted-foreground text-caption text-center">
          {{ t('layout.copyright', { year: new Date().getFullYear() }) }}
        </p>
    </div>
  </div>
</template>
