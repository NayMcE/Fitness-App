import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // If accessing the main page without a token, redirect to login
  if (request.nextUrl.pathname === '/' && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If accessing login/signup with a token, redirect to dashboard
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/signup'],
}
