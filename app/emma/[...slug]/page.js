import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import EmmaClient from '../../EmmaClient'

export default async function EmmaSubPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  return <EmmaClient user={session.user} />
}
