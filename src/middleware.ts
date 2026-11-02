import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignore payload admin, API, static files, images, etc.
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/media') ||
    pathname.startsWith('/brand') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // If already prefixed with /bn or /en, proceed
  if (pathname.startsWith('/bn') || pathname.startsWith('/en')) {
    return NextResponse.next()
  }

  // Rewrite default English routes to /en prefix internally
  // e.g. / -> /en, /tiles -> /en/tiles, /showrooms -> /en/showrooms
  const url = request.nextUrl.clone()
  url.pathname = `/en${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|admin).*)'],
}
