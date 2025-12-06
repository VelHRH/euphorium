<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ThemeToggler from './components/organisms/theme-toggler.vue'
import ThemeProvider from './components/organisms/theme-provider.vue'
</script>

<template>
  <ThemeProvider>
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <nav>
        <ThemeToggler />
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>

    <RouterView />
  </ThemeProvider>
</template>
