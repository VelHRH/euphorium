<template>
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
</template>
