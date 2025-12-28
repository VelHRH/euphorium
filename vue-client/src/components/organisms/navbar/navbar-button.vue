<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface NavbarButtonProps {
  label: string
  route: string
  isGhost?: boolean
}

const props = withDefaults(defineProps<NavbarButtonProps>(), {
  isGhost: true,
})

const router = useRouter()
const route = useRoute()

const isActive = computed(() => {
  return route.path.includes(props.route)
})

const buttonClasses = computed(() => {
  const baseClasses =
    'px-4 py-2 rounded-full font-medium transition-colors duration-200 cursor-pointer'

  if (props.isGhost) {
    return [
      baseClasses,
      'text-foreground hover:bg-muted/50',
      isActive.value && 'bg-primary/20 text-primary',
    ]
      .filter(Boolean)
      .join(' ')
  }

  return [baseClasses, 'bg-primary text-background hover:bg-primary/90'].join(' ')
})

const handleClick = () => {
  router.push(props.route)
}
</script>

<template>
  <button :class="buttonClasses" @click="handleClick">
    {{ label }}
  </button>
</template>
