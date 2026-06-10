<script setup lang="ts">
import Image from '@/components/molecules/image.vue'
import { ref } from 'vue'

const { title, imagePath } = defineProps<{
  title: string
  imagePath: string
}>()

const parallaxImageRef = ref<HTMLElement | null>(null)
const parallaxTransform = ref({ x: 0, y: 0 })
const imageScale = 1.1

const handleMouseMove = (event: MouseEvent) => {
  if (!parallaxImageRef.value) return

  const rect = parallaxImageRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const offsetX = (event.clientX - centerX) / (rect.width / 2)
  const offsetY = (event.clientY - centerY) / (rect.height / 2)

  parallaxTransform.value = {
    x: offsetX * 15,
    y: offsetY * 15,
  }
}

const handleMouseLeave = () => {
  parallaxTransform.value = { x: 0, y: 0 }
}
</script>

<template>
  <div
    class="rounded-xl flex flex-col justify-between gap-4 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-[transform, colors] duration-500 hover:transform hover:scale-105 hover:border-0 hover:z-50"
  >
    <h1 class="text-4xl m-4 mb-0">{{ title }}</h1>
    <div
      ref="parallaxImageRef"
      class="relative w-full h-full overflow-hidden"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <Image
        :src="imagePath"
        :alt="title"
        :style="{
          transform: `translate(${parallaxTransform.x}px, ${parallaxTransform.y}px) scale(${imageScale})`,
          transformOrigin: 'center center',
        }"
        class="object-contain object-right transition-transform duration-300 ease-out"
      />
    </div>
  </div>
</template>
