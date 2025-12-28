<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ThemeToggler from './components/organisms/theme-toggler.vue'
import AppProvider from './components/organisms/provider/app-provider.vue'
</script>

<template>
  <AppProvider>
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <nav>
        <ThemeToggler />
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>

    <RouterView />
  </AppProvider>
</template>
