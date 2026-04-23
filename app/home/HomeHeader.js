'use client'
import { useEffect, useState } from 'react'

export default function HomeHeader({ name, image, initials }) {
  const [greeting, setGreeting] = useState('Hola')

  useEffect(() => {
    const h = new Date().getHours()
    if (h >= 5 && h < 12) setGreeting('Buenos días')
    else if (h >= 12 && h < 20) setGreeting('Buenas tardes')
    else setGreeting('Buenas noches')
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
      <div>
        <div style={{ fontSize: '22px', fontWeight: '700', color: '#111', lineHeight: '1.2' }}>
          {greeting}, {name} 👋
        </div>
        <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '5px' }}>¿Qué quieres hacer hoy?</div>
      </div>
      <div style={{ flexShrink: 0, marginLeft: '16px' }}>
        {image ? (
          <img
            src={image}
            alt={name}
            referrerPolicy="no-referrer"
            style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid #e0e8f8', display: 'block' }}
          />
        ) : (
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: '#1d4ed8', border: '2px solid #e0e8f8' }}>
            {initials}
          </div>
        )}
      </div>
    </div>
  )
}
