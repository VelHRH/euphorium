<script setup lang="ts">
import Accordion from '@/components/ui/accordion/Accordion.vue'
import AccordionItem from '@/components/ui/accordion/AccordionItem.vue'
import AccordionTrigger from '@/components/ui/accordion/AccordionTrigger.vue'
import AccordionContent from '@/components/ui/accordion/AccordionContent.vue'
import { useFetchFestivals } from '../hooks/use-fetch-festivals'

const { data: festivals } = useFetchFestivals()
</script>

<template>
  <Accordion type="single" collapsible>
    <AccordionItem
      v-for="edge in festivals?.edges"
      :key="edge.node.id"
      :value="edge.node.id"
    >
      <AccordionTrigger>
        {{ edge.node.name }}
      </AccordionTrigger>
      <AccordionContent> CONTENT </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
