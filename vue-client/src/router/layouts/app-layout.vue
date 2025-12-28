<script setup lang="ts">
import NavBarPanel from '@/components/organisms/navbar/navbar-panel.vue'
</script>

<template>
  <div className="px-2 min-h-screen flex flex-col">
    <NavBarPanel />
    <div className="mt-22"></div>
    <div className="flex-1"><slot /></div>
    <div className="py-4 mt-4">
      <p className="text-center">
        <span className="text-muted-foreground text-sm">
          &copy; {{ new Date().getFullYear() }} Euphorium family
        </span>
      </p>
    </div>
  </div>
</template>
