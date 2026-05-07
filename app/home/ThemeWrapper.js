'use client'
import { useEffect, useState } from 'react'
import HomeHeader from './HomeHeader'
import Stat from './Stat'
import SignOutButton from './SignOutButton'

const IconArrow = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
)

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
      <HomeHeader name={name} image={image} initials={initials} />

      {/* Apps section */}
      <div style={{ padding: '0 22px 32px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 14,
        }}>
          <div style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--sub)', textTransform: 'uppercase', fontWeight: 500 }}>
            Mis apps
          </div>
          <div style={{ fontSize: 11, color: 'var(--sub)' }}>3 espacios</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Card 1 — Gastos (hero, activa) */}
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
            <div style={{ marginBottom: 18 }}>
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

            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 4 }}>
              Gastos
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 18 }}>
              Presupuestos, gastos compartidos y cuotas de tarjeta
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              gap: 1, padding: 1,
              background: 'var(--border)', borderRadius: 12, overflow: 'hidden',
              marginBottom: 14,
            }}>
              <Stat label="Saldo Santander" value="$1.284K" />
              <Stat label="Saldo Falabella" value="$642K" />
              <Stat label="Últ. Falabella"  value="11 · Abr" />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500 }}>
                Abrir <IconArrow />
              </div>
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

          {/* Card 3 — Slot vacío */}
          <div style={{
            border: '1px dashed var(--border)', borderRadius: 22,
            padding: '22px 20px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: 110, gap: 8, color: 'var(--sub)',
          }}>
            <div style={{ fontSize: 28, fontFamily: "'Instrument Serif', serif", lineHeight: 1, fontWeight: 300 }}>+</div>
            <div style={{ fontSize: 12, letterSpacing: '0.04em' }}>Sugerir nueva app</div>
          </div>

        </div>

        {/* Footer */}
        <div style={{ marginTop: 28, textAlign: 'center', fontSize: 11, color: 'var(--sub)', letterSpacing: '0.04em' }}>
          FWV · 2026 · <SignOutButton inline />
        </div>
      </div>
    </div>
  )
}
