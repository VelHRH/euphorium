<script lang="ts" setup>
const { label } = defineProps<{
  label: string
}>()
</script>

<template>
  <button class="cursor-pointer text-primary">
    {{ label }}
  </button>
</template>
