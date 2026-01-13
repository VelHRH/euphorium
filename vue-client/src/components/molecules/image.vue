<script setup lang="ts">
import { ref, computed } from 'vue'
import { ImageIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

defineOptions({
  name: 'ImageComponent',
})

interface ImageProps {
  src?: string | null
  alt: string
  parentClassName?: string
  className?: string
}

const props = withDefaults(defineProps<ImageProps>(), {
  src: null,
  parentClassName: '',
  className: '',
})

const noImage = ref<boolean>(!props.src)

const onImageError = () => {
  noImage.value = true
}

const imageSrc = computed(() => props.src || '')
</script>

<template>
  <div
    v-if="noImage"
    :class="
      cn('w-full h-full flex flex-col gap-4 items-center justify-center bg-gray-100', className)
    "
  >
    <ImageIcon class="w-8 h-8 text-gray-400" />
    <p class="text-gray-500 text-xs">No image</p>
  </div>
  <div v-else :class="cn('relative w-full h-full', parentClassName)">
    <img
      :src="imageSrc"
      :alt="alt"
      :class="cn('absolute inset-0 w-full h-full object-cover', className)"
      @error="onImageError"
    />
  </div>
</template>
