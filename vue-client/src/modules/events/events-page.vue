<script setup lang="ts">
import { ref } from 'vue'
import EventCard from './components/event-card.vue'

const picture1 = `/images/vidbir-2026-${1}.png`
const picture2 = `/images/supernova-2026-${[1, 2, 3][Math.floor(Math.random() * [1, 2, 3].length)]}.png`

const picture3 = ref<string>(picture1)
const picture4 = ref<string>(picture1)

</script>

<template>
  <div class="h-screen flex flex-col gap-8">
    <div class="grid grid-cols-4 grid-rows-2 gap-4 h-2/3">
      <EventCard
        class="col-span-2 row-span-2 origin-top-left border-2 border-border"
        title="Vidbir 2026 🇺🇦"
        :imagePath="picture1"
      />
      <EventCard
        class="col-span-1 row-span-2 border-2 border-border"
        title="Supernova 2026 🇱🇻"
        :imagePath="picture2"
      />
      <EventCard
        class="col-span-1 row-span-1 origin-top-right border-2 border-border"
        title="Enter our fantasy"
        :imagePath="picture3"
      />
      <EventCard
        class="col-span-1 row-span-1 origin-top-right border-2 border-border"
        title="Create rankings"
        :imagePath="picture4"
      />
    </div>
  </div>
</template>
