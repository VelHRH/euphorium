<script setup lang="ts">
import Accordion from '@/components/ui/accordion/Accordion.vue'
import AccordionItem from '@/components/ui/accordion/AccordionItem.vue'
import AccordionTrigger from '@/components/ui/accordion/AccordionTrigger.vue'
import AccordionContent from '@/components/ui/accordion/AccordionContent.vue'
import Image from '@/components/molecules/image.vue'
import { useFetchFestivals } from '../hooks/use-fetch-festivals'
import { computed } from 'vue'

const { data: festivals, isLoading } = useFetchFestivals()

const festivalsList = computed(() => festivals.value?.edges || [])
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-background via-background to-muted/20 p-6">
    <div class="max-w-6xl mx-auto mb-12">
      <div class="text-center space-y-4">
        <h1
          class="text-6xl font-bold bg-linear-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent w-1/2 mx-auto"
        >
          Eurovision Festivals
        </h1>
        <div
          class="w-32 h-1 bg-linear-to-r from-neon-purple via-neon-pink to-neon-cyan mx-auto rounded-full"
        ></div>
      </div>
    </div>

    <div v-if="!isLoading && (!festivalsList || festivalsList.length === 0)">
      <p class="text-center text-2xl font-bold">No festivals found</p>
    </div>

    <!-- Festivals Grid -->
    <div class="max-w-6xl mx-auto">
      <Accordion type="single" collapsible class="space-y-6">
        <AccordionItem
          v-for="(edge, index) in festivalsList"
          :key="edge.node.id"
          :value="edge.node.id"
          class="group relative overflow-hidden rounded-2xl border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:border-neon-purple/50 transition-all duration-500 hover:shadow-2xl hover:shadow-neon-purple/20"
        >
          <AccordionTrigger
            class="flex p-6 cursor-pointer items-center gap-6 w-full hover:no-underline group-hover:text-neon-purple transition-colors duration-300"
          >
            <div
              class="absolute inset-0 bg-linear-to-r from-neon-purple/5 via-transparent to-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            ></div>
            <!-- TODO: only for ongoing festivals-->
            <div
              class="absolute bottom-4 left-4 w-2 h-2 bg-neon-cyan rounded-full animate-pulse delay-300"
            ></div>
            <div
              class="shrink-0 w-12 h-12 rounded-full bg-linear-to-br from-neon-purple to-neon-pink flex items-center justify-center text-background font-bold text-lg shadow-lg"
            >
              {{ String(index + 1).padStart(2, '0') }}
            </div>

            <div class="flex-1 text-left">
              <h3
                class="text-2xl font-semibold group-hover:text-neon-purple transition-colors duration-300"
              >
                {{ edge.node.name }}
              </h3>
              <p class="text-sm text-muted-foreground mt-1">
                {{ edge.node.shows?.length || 0 }} shows available
              </p>
            </div>

            <div
              class="hidden md:flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div
                v-for="(imgPath, imgIndex) in edge.node.imgPaths?.slice(0, 3)"
                :key="imgIndex"
                class="w-16 h-16 rounded-lg overflow-hidden border-2 border-border/30 transition-colors duration-300"
                :style="{ transform: `translateX(${imgIndex * -8}px)` }"
              >
                <Image
                  :src="imgPath"
                  :alt="`${edge.node.name} preview ${imgIndex + 1}`"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent class="px-8 pb-8"> CONTENT </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div v-if="isLoading" class="space-y-6">
        <div v-for="i in 3" :key="i" class="animate-pulse">
          <div class="rounded-2xl border-2 border-border/30 bg-card/50 p-8">
            <div class="flex items-center gap-6">
              <div class="w-12 h-12 bg-muted rounded-full"></div>
              <div class="flex-1 space-y-2">
                <div class="h-6 bg-muted rounded w-1/3"></div>
                <div class="h-4 bg-muted/60 rounded w-1/4"></div>
              </div>
              <div class="flex gap-2">
                <div class="w-16 h-16 bg-muted rounded-lg"></div>
                <div class="w-16 h-16 bg-muted rounded-lg"></div>
                <div class="w-16 h-16 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
