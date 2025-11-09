import { RouteName } from './route-names'

export type RoutesType = Readonly<{
  [key in RouteName]: {
    title: string
    url: string
    isPublic?: boolean
    visibleInMenu?: boolean
  }
}>
