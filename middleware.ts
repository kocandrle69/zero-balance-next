import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const REVEAL_DATE = new Date('2026-07-26T00:00:00Z')
const BYPASS_PARAM = 'preview'
const BYPASS_VALUE = 'zbs2027'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  if (pathname.startsWith('/coming-soon')) return NextResponse.next()
  if (pathname.startsWith('/_next')) return NextResponse.next()
  if (pathname.startsWith('/api')) return NextResponse.next()
  if (pathname.match(/\.\w+$/)) return NextResponse.next()

  const now = new Date()
  if (now >= REVEAL_DATE) return NextResponse.next()

  if (searchParams.get(BYPASS_PARAM) === BYPASS_VALUE) {
    const response = NextResponse.next()
    response.cookies.set('zbs_preview', '1', { path: '/', maxAge: 60 * 60 * 24 * 30 })
    return response
  }

  if (request.cookies.get('zbs_preview')?.value === '1') return NextResponse.next()

  return NextResponse.redirect(new URL('/coming-soon', request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
}
