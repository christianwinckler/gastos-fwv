'use client'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

export default function SignOutButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '13px',
        color: hovered ? '#dc2626' : '#9ca3af',
        fontFamily: 'inherit',
        padding: '4px 8px',
        borderRadius: '6px',
        transition: 'color 0.15s',
      }}
    >
      Cerrar sesión
    </button>
  )
}
