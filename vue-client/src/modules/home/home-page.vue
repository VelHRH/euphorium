<script setup lang="ts">
import { ref } from 'vue'
import HomeCard from './components/home-card.vue'

const picture1 = 1
const allPictures = [1, 2, 3]
const picture2 = ref(0)
const picture3 = ref(0)
const picture4 = ref(0)

picture2.value = allPictures[Math.floor(Math.random() * allPictures.length)] as number
let leftOverPictures = allPictures.filter(n => n !== picture2.value)
picture3.value = leftOverPictures[Math.floor(Math.random() * leftOverPictures.length)] as number
leftOverPictures = leftOverPictures.filter(n => n !== picture3.value)
picture4.value = leftOverPictures[Math.floor(Math.random() * leftOverPictures.length)] as number
</script>

<template>
  <div class="h-screen flex flex-col gap-8">
    <div class="grid grid-cols-4 grid-rows-2 gap-4 h-2/3">
      <HomeCard
        class="col-span-2 row-span-2 origin-top-left border-2 border-border"
        title="Vidbir 2026 🇺🇦"
        :imagePath="`/images/vidbir-2026-${picture1}.png`"
      />
      <HomeCard
        class="col-span-1 row-span-2 border-2 border-border"
        title="Supernova 2026 🇱🇻"
        :imagePath="`/images/supernova-2026-${picture2}.png`"
      />
      <HomeCard
        class="col-span-1 row-span-1 origin-top-right border-2 border-border"
        title="Enter our fantasy"
        :imagePath="`/images/supernova-2026-${picture3}.png`"
      />
      <HomeCard
        class="col-span-1 row-span-1 origin-top-right border-2 border-border"
        title="Create rankings"
        :imagePath="`/images/supernova-2026-${picture4}.png`"
      />
    </div>
  </div>
</template>
