'use client'
import { useEffect } from 'react'

export default function ThemeApplier() {
  useEffect(() => {
    const apply = () => {
      try {
        const dark = localStorage.getItem('fwv_dark') === '1'
        document.documentElement.classList.toggle('dark', dark)
      } catch (e) {}
    }
    apply()

    // Keep in sync when other tabs/components write localStorage
    window.addEventListener('storage', apply)
    return () => window.removeEventListener('storage', apply)
  }, [])

  return null
}
