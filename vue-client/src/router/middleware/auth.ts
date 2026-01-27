import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { getCurrentUser } from '@/modules/auth/services/get-user'
import { Route } from '../types/routes'
import { routes } from '..'

const PROTECTED_ROUTES = [Route.HOME, Route.SHOWS, Route.LIBRARY, Route.PROFILE] // TODO: do it in router config
const PUBLIC_ONLY_ROUTES = [Route.LOGIN, Route.SIGN_UP]

export const authMiddleware = async (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const isAuthenticated = await getCurrentUser()

  const targetRoute = Object.keys(routes).find(route => to.path === routes[route as Route].path) as
    | Route
    | undefined

  // If user is authenticated and trying to access auth-only pages (login/signup)
  if (isAuthenticated && targetRoute && PUBLIC_ONLY_ROUTES.includes(targetRoute)) {
    next({ name: Route.HOME.toLowerCase() })
    return
  }

  // If user is not authenticated and trying to access protected routes
  if (!isAuthenticated && targetRoute && PROTECTED_ROUTES.includes(targetRoute)) {
    next({ name: Route.LOGIN.toLowerCase() })
    return
  }

  // Allow navigation
  next()
}
