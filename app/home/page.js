import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import HomeHeader from './HomeHeader'
import SignOutButton from './SignOutButton'
import './home.css'

export const metadata = { title: 'Inicio — FWV App' }

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const firstName = session.user.name?.split(' ')[0] || session.user.email.split('@')[0]
  const initials = session.user.name
    ? session.user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : session.user.email[0].toUpperCase()

  const year = new Date().getFullYear()

  return (
    <>
      <div className="home-wrap">
        <div className="home-inner">

          {/* Header */}
          <div style={{ marginBottom: '28px' }}>
            <HomeHeader name={firstName} image={session.user.image} initials={initials} />
          </div>

          {/* Apps section */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '14px' }}>
              Mis Apps
            </div>

            <div className="apps-grid">

              {/* Card 1 — Gastos FWV */}
              <a href="/gastos" className="app-card">
                <div className="card-icon" style={{ background: '#dbeafe' }}>💰</div>
                <div style={{ fontWeight: '700', fontSize: '16px', color: '#111', lineHeight: '1.2' }}>Gastos FWV</div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '5px', lineHeight: '1.4' }}>Presupuesto, gastos y pagos</div>
                <span className="badge badge-active">Activo</span>
                <div className="card-deco" style={{ background: '#eff6ff' }} />
              </a>

              {/* Card 2 — Calendario Comida */}
              <div className="app-card-disabled">
                <div className="card-icon" style={{ background: '#ede9fe' }}>🍽️</div>
                <div style={{ fontWeight: '700', fontSize: '16px', color: '#9ca3af', lineHeight: '1.2' }}>Calendario Comida</div>
                <div style={{ fontSize: '12px', color: '#c4b5fd', marginTop: '5px', lineHeight: '1.4' }}>Planificación semanal</div>
                <span className="badge badge-soon">Próximamente</span>
                <div className="card-deco" style={{ background: '#f5f3ff' }} />
              </div>

              {/* Card 3 — Placeholder */}
              <div className="app-card-empty">
                <div style={{ fontSize: '36px', color: '#d1d5db', fontWeight: '300', lineHeight: '1' }}>+</div>
                <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '500' }}>Próximamente</div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: '48px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#d1d5db', marginBottom: '8px' }}>FWV Apps · {year}</div>
            <SignOutButton />
          </div>

        </div>
      </div>
    </>
  )
}
