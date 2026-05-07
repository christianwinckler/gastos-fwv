'use client'
export default function Stat({ label, value }) {
  return (
    <div style={{ background: 'var(--inner-card)', padding: '11px 12px' }}>
      <div style={{
        fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase',
        color: 'var(--sub)', fontWeight: 500, marginBottom: 4,
      }}>
        {label}
      </div>
      <div style={{ fontSize: 14.5, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--fg)' }}>
        {value}
      </div>
    </div>
  )
}
