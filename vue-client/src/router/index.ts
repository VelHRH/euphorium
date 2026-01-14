import HomePage from '@/modules/home/home-page.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { Layouts } from './types/layouts'
import { Route } from './types/routes'
import SignUpPage from '@/modules/auth/pages/sign-up-page.vue'
import LoginPage from '@/modules/auth/pages/login-page.vue'
import { authMiddleware } from './middleware/auth'
import FestivalsPage from '@/modules/festivals/pages/festivals-page.vue'

export const routes: Record<Route, RouteRecordRaw> = {
  [Route.HOME]: {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      layout: Layouts.APP,
    },
  },
  [Route.SHOWS]: {
    path: '/shows',
    name: 'shows',
    component: HomePage, // TODO: Add shows page
    meta: {
      layout: Layouts.APP,
    },
  },
  [Route.LIBRARY]: {
    path: '/library',
    name: 'library',
    component: HomePage, // TODO: Add library page
    meta: {
      layout: Layouts.APP,
    },
  },
  [Route.PROFILE]: {
    path: '/profile',
    name: 'profile',
    component: HomePage, // TODO: Add profile page
    meta: {
      layout: Layouts.APP,
    },
  },
  [Route.LOGIN]: {
    path: '/login',
    name: 'login',
    component: LoginPage, // TODO: Add login page
    meta: {
      layout: Layouts.AUTH,
    },
  },
  [Route.SIGN_UP]: {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUpPage,
    meta: {
      layout: Layouts.AUTH,
    },
  },
  [Route.FESTIVALS]: {
    path: '/festivals',
    name: 'festivals',
    component: FestivalsPage,
    meta: {
      layout: Layouts.APP,
    },
  },
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: Object.values(routes),
})

// Add global navigation guard for authentication
router.beforeEach(authMiddleware)

export default router
