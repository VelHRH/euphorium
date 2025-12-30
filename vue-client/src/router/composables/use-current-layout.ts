import AppLayout from '@/router/layouts/app-layout.vue'
import { computed, type Component } from 'vue'
import { useRoute } from 'vue-router'
import { Layouts } from '../types/layouts'
import AuthLayout from '../layouts/auth-layout.vue'

const layouts: Record<Layouts, Component> = {
  [Layouts.APP]: AppLayout,
  [Layouts.AUTH]: AuthLayout,
}

export const useCurrentLayout = () => {
  const route = useRoute()
  const currentLayout = computed(() => {
    return layouts[route.meta.layout as keyof typeof layouts]
  })

  return { currentLayout }
}
