'use client'
import { useEffect, useState } from 'react'
import HomeHeader from './HomeHeader'
import SignOutButton from './SignOutButton'

export default function ThemeWrapper({ name, image, initials }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    try {
      const isDark = localStorage.getItem('fwv_dark') === '1'
      setDark(isDark)
    } catch (e) {}
  }, [])

  const cardShadow = dark
    ? '0 1px 0 oklch(1 0 0 / 0.04) inset'
    : '0 1px 2px oklch(0 0 0 / 0.03)'

  return (
    <div
      suppressHydrationWarning
      style={{
        minHeight: '100dvh',
        background: 'var(--bg)', color: 'var(--fg)',
        fontFamily: "'Geist', -apple-system, sans-serif",
        transition: 'background 250ms, color 250ms',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto', width: '100%' }}>
      <HomeHeader name={name} image={image} initials={initials} />

      {/* Apps section */}
      <div style={{ padding: '0 22px 32px' }}>
        <div style={{
          fontSize: 11, letterSpacing: '0.14em', color: 'var(--sub)',
          textTransform: 'uppercase', fontWeight: 500,
          marginBottom: 14,
        }}>
          Mis apps
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Card 1 — Gastos (activa) */}
          <a
            href="/gastos"
            style={{
              display: 'block', textDecoration: 'none', color: 'inherit',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 22,
              padding: '22px 20px',
              boxShadow: cardShadow,
              transition: 'transform 0.18s ease, background 0.18s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--card-hover)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--card)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: 'var(--accent)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Instrument Serif', serif", fontSize: 22, fontWeight: 400,
                letterSpacing: '-0.02em',
                boxShadow: '0 6px 14px color-mix(in srgb, var(--accent) 20%, transparent)',
              }}>
                $
              </div>
            </div>

            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 4 }}>
              Gastos
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>
              Presupuestos, gastos compartidos y cuotas de tarjeta
            </div>
          </a>

          {/* Card 2 — Calendario Comida (próximamente) */}
          <div style={{
            background: 'var(--card)', border: '1px dashed var(--border)',
            borderRadius: 22, padding: '22px 20px',
            opacity: 0.85,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: 'var(--teal-bg)', color: 'var(--teal-fg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Instrument Serif', serif", fontSize: 20,
              }}>
                ◦
              </div>
              <div style={{
                fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--sub)', fontWeight: 500,
                padding: '3px 8px', border: '1px solid var(--border)', borderRadius: 999,
              }}>
                Próximamente
              </div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 4 }}>
              Calendario Comida
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>
              Planifica menús semanales y lista de compras automática
            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={{ marginTop: 28, textAlign: 'center', fontSize: 11, color: 'var(--sub)', letterSpacing: '0.04em' }}>
          FWV · 2026 · <SignOutButton inline />
        </div>
      </div>
      </div>
    </div>
  )
}
