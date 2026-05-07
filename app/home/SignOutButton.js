'use client'
import { signOut } from 'next-auth/react'

export default function SignOutButton({ inline = false }) {
  if (inline) {
    return (
      <span
        onClick={() => signOut({ callbackUrl: '/login' })}
        style={{ textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'pointer' }}
      >
        Cerrar sesión
      </span>
    )
  }

  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontSize: 13, color: 'var(--sub)', fontFamily: 'inherit',
        padding: '4px 8px', borderRadius: 6,
        transition: 'color 0.15s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--error)' }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--sub)' }}
    >
      Cerrar sesión
    </button>
  )
}
