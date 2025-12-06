<script lang="ts" setup>
const { label } = defineProps<{
  label: string
}>()
</script>

<template>
  <button class="bg-blue-500 p-2 rounded-md cursor-pointer text-primary">
    {{ label }}
  </button>
</template>
