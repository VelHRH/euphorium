import { RouteName } from './route-names'
import { RoutesType } from './types'

export const Routes: RoutesType = Object.freeze({
  [RouteName.HOME]: {
    title: 'Home',
    url: '/',
    visibleInMenu: true,
  },
  [RouteName.USERS]: {
    title: 'Users',
    url: '/user',
    visibleInMenu: true,
  },
  [RouteName.LOGIN]: {
    title: 'Login',
    url: '/login',
    isPublic: true,
  },
  [RouteName.SIGN_UP]: {
    title: 'Sign Up',
    url: '/sign-up',
    isPublic: true,
  },
})
