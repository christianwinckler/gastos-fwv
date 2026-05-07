'use client'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

const IconGoogle = () => (
  <svg width={14} height={14} viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
)

const IconSun = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
)

const IconMoon = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

function LoginContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [dark, setDark] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const pending = sessionStorage.getItem('pwa_redirect')
    if (pending) {
      sessionStorage.removeItem('pwa_redirect')
      window.location.replace(pending)
      return
    }
  }, [])

  useEffect(() => {
    try {
      const isDark = localStorage.getItem('fwv_dark') === '1'
      setDark(isDark)
      document.documentElement.classList.toggle('dark', isDark)
    } catch (e) {}
  }, [])

  const handleLogin = () => {
    setTransitioning(true)
    sessionStorage.setItem('pwa_redirect', '/home')
    setTimeout(() => {
      signIn('google', { callbackUrl: '/home' })
    }, 300)
  }

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    try {
      localStorage.setItem('fwv_dark', next ? '1' : '0')
      document.documentElement.classList.toggle('dark', next)
    } catch (e) {}
  }

  let errorMsg = null
  if (error === 'AccessDenied') {
    errorMsg = 'Tu cuenta no tiene acceso a esta aplicación.'
  } else if (error) {
    errorMsg = 'Ocurrió un error al iniciar sesión. Intenta de nuevo.'
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'var(--bg)', color: 'var(--fg)',
      display: 'flex', flexDirection: 'column',
      padding: '32px 24px',
      fontFamily: "'Geist', -apple-system, sans-serif",
      transition: 'background 250ms, color 250ms, opacity 400ms, transform 500ms cubic-bezier(.2,.8,.2,1)',
      opacity: transitioning ? 0 : 1,
      transform: transitioning ? 'scale(1.02)' : 'scale(1)',
      boxSizing: 'border-box',
    }}>

      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--sub)', fontWeight: 500, textTransform: 'uppercase' }}>
          FWV · 2026
        </div>
        <button
          onClick={toggleDark}
          aria-label="Cambiar tema"
          style={{
            width: 34, height: 34, borderRadius: 11,
            border: '1px solid var(--border)', background: 'var(--card)',
            color: 'var(--fg)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          {dark ? <IconSun /> : <IconMoon />}
        </button>
      </div>

      {/* Hero */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', maxWidth: 420, margin: '0 auto', width: '100%',
      }}>
        <div style={{
          marginBottom: 28,
          transition: 'transform 500ms cubic-bezier(.2,.8,.2,1), opacity 500ms',
          transform: transitioning ? 'translateY(-40px) scale(0.7)' : 'none',
          opacity: transitioning ? 0 : 1,
        }}>
          <img
            src="/fwv-icon.png"
            alt="FWV"
            width={56}
            height={56}
            style={{
              display: 'block',
              borderRadius: 13,
              boxShadow: 'var(--mark-shadow)',
            }}
          />
        </div>

        <h1 style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 38, lineHeight: 1.05, fontWeight: 400,
          letterSpacing: '-0.02em',
          margin: 0, marginBottom: 14,
        }}>
          Tu familia,<br />
          <span style={{ fontStyle: 'italic', color: 'var(--muted)' }}>en un solo lugar.</span>
        </h1>

        <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--muted)', margin: 0, marginBottom: 36, maxWidth: 320 }}>
          Gastos, alimentación y mucho más — una casa digital para acompañarlos en el día a día.
        </p>

        {errorMsg && (
          <div style={{
            background: 'var(--error-bg)', color: 'var(--error)',
            borderRadius: 10, padding: '10px 14px',
            fontSize: 13, marginBottom: 16,
            lineHeight: 1.4,
          }}>
            {errorMsg}
          </div>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: '100%', padding: '14px 18px',
            background: 'var(--fg)', color: 'var(--bg)',
            border: 'none', borderRadius: 14,
            fontFamily: 'inherit', fontSize: 14.5, fontWeight: 500,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            transition: 'transform 0.15s, opacity 0.15s',
            boxSizing: 'border-box',
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)' }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          <span style={{
            background: '#fff', borderRadius: '50%', padding: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IconGoogle />
          </span>
          Continuar con Google
        </button>

        <div style={{
          marginTop: 14, fontSize: 12, color: 'var(--sub)',
          display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center',
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          Acceso restringido a cuentas autorizadas
        </div>
      </div>

      {/* Footer */}
      <div style={{ fontSize: 11, color: 'var(--sub)', textAlign: 'center', letterSpacing: '0.03em' }}>
        FWV App · versión 1.0
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  )
}
