import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import ThemeWrapper from './ThemeWrapper'

export const metadata = { title: 'Inicio — FWV App' }

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const firstName = session.user.name?.split(' ')[0] || session.user.email.split('@')[0]
  const initials = session.user.name
    ? session.user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : session.user.email[0].toUpperCase()

  return (
    <ThemeWrapper
      name={firstName}
      image={session.user.image}
      initials={initials}
    />
  )
}
