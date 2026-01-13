<script setup lang="ts">
import HomeCard from './components/home-card.vue'
</script>

<template>
  <div class="h-screen flex flex-col gap-8">
    <div class="grid grid-cols-4 grid-rows-2 gap-4 h-2/3">
      <HomeCard
        class="col-span-2 row-span-2 origin-top-left border-2 border-border"
        title="Vidbir 2026 🇺🇦"
        imagePath="/images/supernova-2026.png"
      />
      <HomeCard
        class="col-span-1 row-span-2 border-2 border-border"
        title="Supernova 2026 🇱🇻"
        imagePath="/images/supernova-2026.png"
      />
      <HomeCard
        class="col-span-1 row-span-1 origin-top-right border-2 border-border"
        title="Enter our fantasy"
        imagePath="/images/supernova-2026.png"
      />
      <HomeCard
        class="col-span-1 row-span-1 origin-top-right border-2 border-border"
        title="Create rankings"
        imagePath="/images/supernova-2026.png"
      />
    </div>
  </div>
</template>
