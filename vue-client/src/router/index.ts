import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '../views/home-page.vue'
import { Layouts } from './types/layouts'
import { Route } from './types/routes'

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
    component: HomePage, // TODO: Add login page
    meta: {
      layout: Layouts.AUTH,
    },
  },
  [Route.SIGN_UP]: {
    path: '/sign-up',
    name: 'sign up',
    component: HomePage, // TODO: Add sign up page
    meta: {
      layout: Layouts.AUTH,
    },
  },
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: Object.values(routes),
})

export default router
