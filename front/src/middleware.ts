import { NextRequest, NextResponse } from 'next/server'

import { middlewares as activatedMiddlewares } from '$middlewares'

export async function middleware(req: NextRequest) {
  const nextResponse = NextResponse.next()
  const middlewareFunctions = activatedMiddlewares.map((fn) => fn(req))

  const middlewareHeader = []

  for (const middleware of middlewareFunctions) {
    const result = await middleware

    if (!result.ok) {
      return result
    }

    middlewareHeader.push(result.headers)
  }

  let redirectTo = null

  middlewareHeader.some((header) => {
    const redirect = header.get('x-middleware-request-redirect')

    if (redirect) {
      redirectTo = redirect

      return true
    }

    return false
  })

  if (redirectTo) {
    return NextResponse.redirect(new URL(redirectTo, req.url), {
      status: 307,
    })
  }

  return nextResponse
}
