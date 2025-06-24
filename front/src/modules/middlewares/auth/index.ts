import { NextRequest, NextResponse } from 'next/server'

import { Routes } from '$config'

import { getSessionUser } from './getSessionUser'

const publicNextPaths = ['/api', '/_next/static', '/_next/image', '/images']

const publicPaths = [
  ...publicNextPaths,
  ...Object.values(Routes)
    .filter((route) => route.isPublic)
    .map((route) => route.url),
]

const loginPaths = [Routes.LOGIN.url, Routes.SIGN_UP.url]

export default async function authMiddleware(
  req: NextRequest,
): Promise<NextResponse> {
  const { pathname } = req.nextUrl
  const header = new Headers()
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))
  const isLoginPaths = loginPaths.some((path) => pathname.startsWith(path))

  if (isLoginPaths) {
    const user = await getSessionUser()

    if (user?.email) {
      header.set('redirect', Routes.HOME.url)
    }
  }

  if (!isPublicPath) {
    const user = await getSessionUser()

    if (!user?.email) {
      header.set('redirect', Routes.LOGIN.url)
    }
  }

  return NextResponse.next({ request: { headers: header } })
}
