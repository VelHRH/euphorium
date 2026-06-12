<script setup lang="ts">
import { SITE_NAME } from '@/constants/site-name'
import { routes } from '@/router'
import { Route } from '@/router/types/routes'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/auth/composables/use-auth'
import NavbarButton from './navbar-button.vue'
import LocaleSwitcher from './locale-switcher.vue'
import ThemeToggler from './theme-toggler.vue'
import { Button } from '@/components/ui/button'
import { UserIcon } from 'lucide-vue-next'

const router = useRouter()
const { t } = useI18n()
const { isAuthenticated, logout } = useAuth()

const navigationItems = computed(() =>
  Object.keys(routes)
    .filter(key => [Route.EVENTS, Route.HOME].includes(key as Route))
    .map(key => routes[key as Route])
    .filter(i => i !== undefined)
    .map(i => ({
      path: i.path,
      label: t(`nav.${i.name as string}`),
    })),
)

const loginRoute = routes[Route.LOGIN]

const handleLogout = async () => {
  await logout()
  router.push(loginRoute.path)
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
            class="text-t2 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            {{ SITE_NAME }}
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <NavbarButton
          v-for="item in navigationItems"
          :key="item.path"
          :label="item.label"
          :path="item.path"
        />
      </div>
      <div class="flex items-center gap-2">
        <LocaleSwitcher />
        <ThemeToggler />
        <Button class="flex gap-2 items-center" variant="ghost" @click="router.push(routes[Route.PROFILE].path)"
          ><UserIcon
        /></Button>
        <NavbarButton
          v-if="!isAuthenticated"
          :label="t('nav.login')"
          :path="loginRoute.path"
        />
        <Button v-else @click="handleLogout" variant="outline">{{ t('nav.logout') }}</Button>
      </div>
    </div>
  </div>
</template>
