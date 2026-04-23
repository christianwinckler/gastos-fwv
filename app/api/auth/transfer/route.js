import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get('next-auth.session-token')
  const external = process.env.NEXTAUTH_URL_EXTERNAL

  if (!external) {
    return NextResponse.redirect(new URL('/home', process.env.NEXTAUTH_URL))
  }

  if (!sessionCookie?.value) {
    return NextResponse.redirect(new URL('/login', external))
  }

  const url = new URL('/api/auth/receive', external)
  url.searchParams.set('token', sessionCookie.value)
  return NextResponse.redirect(url)
}
