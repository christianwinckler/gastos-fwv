import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { getDetalle } from '@/lib/sheetsService'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }
  try {
    const data = await getDetalle()
    return Response.json(data)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}