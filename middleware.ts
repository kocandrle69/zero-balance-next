import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const REVEAL_DATE = new Date('2026-07-26T00:00:00Z')
const BYPASS_PARAM = 'preview'
const BYPASS_VALUE = 'zbs2027'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  if (!pathname.startsWith('/about')) return NextResponse.next()
  if (pathname.startsWith('/about/coming-soon')) return NextResponse.next()

  const now = new Date()
  if (now >= REVEAL_DATE) return NextResponse.next()

  if (searchParams.get(BYPASS_PARAM) === BYPASS_VALUE) return NextResponse.next()

  return NextResponse.redirect(new URL('/about/coming-soon', request.url))
}

export const config = {
  matcher: ['/about', '/about/:path*'],
}
