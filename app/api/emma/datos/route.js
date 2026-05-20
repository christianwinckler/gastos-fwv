import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { getComidas, getRutinas, getPlan } from '@/lib/emmaService'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const [comidas, rutinas, plan] = await Promise.all([
      getComidas(),
      getRutinas(),
      getPlan(),
    ])
    return Response.json({ ok: true, comidas, rutinas, plan })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
