import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import LoginContent from './LoginContent'

export const metadata = { title: 'Iniciar sesión — FWV App' }

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect('/home')

  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  )
}
