import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-2">Gastos FWV</h1>
      <p className="text-gray-500">Bienvenido, {session.user.name} 👋</p>
    </main>
  )
}