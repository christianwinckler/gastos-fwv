'use client'
import { useEffect, useState } from 'react'
import FwvMark from './FwvMark'

export default function HomeHeader({ name, image, initials }) {
  const [greeting, setGreeting] = useState('Hola')

  useEffect(() => {
    const h = new Date().getHours()
    if (h < 12) setGreeting('Buenos días')
    else if (h < 20) setGreeting('Buenas tardes')
    else setGreeting('Buenas noches')
  }, [])

  return (
    <>
      {/* Top app bar */}
      <div style={{
        padding: '20px 22px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <FwvMark size={32} />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 6px 6px 12px',
          borderRadius: 999,
          background: 'var(--chip-bg)',
          fontSize: 12, color: 'var(--muted)',
        }}>
          {name}
          {image
            ? <img src={image} alt="" referrerPolicy="no-referrer" style={{ width: 26, height: 26, borderRadius: '50%' }} />
            : <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'var(--accent)', color: '#fff',
                fontSize: 11, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {initials}
              </div>
          }
        </div>
      </div>

      {/* Hero greeting */}
      <div style={{ padding: '28px 22px 22px' }}>
        <div style={{
          fontSize: 11, letterSpacing: '0.14em', color: 'var(--sub)',
          textTransform: 'uppercase', fontWeight: 500, marginBottom: 10,
        }}>
          {greeting}
        </div>
        <h1 style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 36, lineHeight: 1.0, fontWeight: 400,
          letterSpacing: '-0.02em',
          margin: 0, color: 'var(--fg)',
        }}>
          {name},{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--muted)' }}>buen día.</span>
        </h1>
      </div>
    </>
  )
}
