<script setup lang="ts">
import { computed, watchEffect, ref } from 'vue'
import HomeCard from './components/home-card.vue'
import { useFetchFestivals } from '../festivals/hooks/use-fetch-festivals'

const { data: festivals } = useFetchFestivals()

const eurovisions = computed(() => {
  const edges = festivals.value?.edges || []
  return edges.filter(
    (edge: { node: { name: string; imgPaths: string[] } }) =>
      edge.node.name.includes('Eurovision') || edge.node.name.includes('Sanremo')
  )
})

const picture1 = `/images/vidbir-2026-${1}.png`
const picture2 = `/images/supernova-2026-${[1, 2, 3][Math.floor(Math.random() * [1, 2, 3].length)]}.png`

const picture3 = ref<string>(picture1)
const picture4 = ref<string>(picture1)

const getRandomEurovisionImage = () => {
  if (eurovisions.value.length === 0) {
    console.warn('No eurovisions available')
    return undefined
  }

  const randomIndex = Math.floor(Math.random() * eurovisions.value.length)
  const randomFestival = eurovisions.value[randomIndex]?.node

  const imgPaths = randomFestival?.imgPaths || []

  if (imgPaths.length === 0) {
    return undefined
  }

  return imgPaths[Math.floor(Math.random() * imgPaths.length)]
}

watchEffect(() => {
  if (eurovisions.value.length > 0) {
    picture3.value = getRandomEurovisionImage() || ''
    picture4.value = getRandomEurovisionImage() || ''
  }
})
</script>

<template>
  <div class="h-screen flex flex-col gap-8">
    <div class="grid grid-cols-4 grid-rows-2 gap-4 h-2/3">
      <HomeCard
        class="col-span-2 row-span-2 origin-top-left border-2 border-border"
        title="Vidbir 2026 🇺🇦"
        :imagePath="picture1"
      />
      <HomeCard
        class="col-span-1 row-span-2 border-2 border-border"
        title="Supernova 2026 🇱🇻"
        :imagePath="picture2"
      />
      <HomeCard
        class="col-span-1 row-span-1 origin-top-right border-2 border-border"
        title="Enter our fantasy"
        :imagePath="picture3"
      />
      <HomeCard
        class="col-span-1 row-span-1 origin-top-right border-2 border-border"
        title="Create rankings"
        :imagePath="picture4"
      />
    </div>
  </div>
</template>
