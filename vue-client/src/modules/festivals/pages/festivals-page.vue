<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { FESTIVALS } from '../graphql/queries/festivals'
import Accordion from '@/components/ui/accordion/Accordion.vue'
import AccordionItem from '@/components/ui/accordion/AccordionItem.vue'
import AccordionTrigger from '@/components/ui/accordion/AccordionTrigger.vue'
import AccordionContent from '@/components/ui/accordion/AccordionContent.vue'

const { result } = useQuery(FESTIVALS, () => ({
  input: {},
}))
</script>

<template>
  <Accordion type="single" collapsible>
    <AccordionItem
      v-for="edge in result?.festivals?.edges"
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
