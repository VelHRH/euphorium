<script setup lang="ts">
import { SITE_NAME } from '@/constants/site-name'
import { routes } from '@/router'
import { Route } from '@/router/types/routes'
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/auth/composables/use-auth'
import NavbarButton from './navbar-button.vue'
import ThemeToggler from './theme-toggler.vue'

const router = useRouter()
const { isAuthenticated, logout } = useAuth()

const navigationItems = Object.keys(routes)
  .filter((key) => [Route.SHOWS, Route.LIBRARY, Route.PROFILE].includes(key as Route))
  .map((key) => routes[key as Route])
  .filter((i) => i !== undefined)
  .map((i) => ({
    path: i.path,
    name: i.name as string,
  }))

const loginRoute = routes[Route.LOGIN]

const handleLogout = async () => {
  await logout()
  router.push(routes[Route.LOGIN].path)
}
</script>

<template>
  <div
    class="h-16 bg-card/20 backdrop-blur-md border-2 border-border rounded-full fixed top-2 left-2 right-2 shadow-lg z-50"
  >
    <div class="flex items-center justify-between h-full text-foreground font-medium px-4 py-2">
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1 mr-4 cursor-pointer" @click="router.push('/')">
          <div
            class="bg-linear-to-r from-secondary to-primary w-12 h-12"
            :style="{
              WebkitMask: 'url(/images/logo-transparent.png) center/contain no-repeat',
              mask: 'url(/images/logo-transparent.png) center/contain no-repeat',
            }"
          ></div>

          <div
            class="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            {{ SITE_NAME }}
          </div>
        </div>
        <NavbarButton
          v-for="item in navigationItems"
          :key="item.path"
          :label="item.name"
          :path="item.path"
        />
      </div>
      <div class="flex items-center gap-2">
        <ThemeToggler />
        <NavbarButton 
          v-if="!isAuthenticated"
          :label="loginRoute.name?.toString() || ''" 
          :path="loginRoute.path" 
          :isGhost="false" 
        />
        <button 
          v-else
          @click="handleLogout"
          class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
