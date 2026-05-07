'use client'
export default function FwvMark({ size = 36 }) {
  return (
    <img
      src="/fwv-icon.png"
      alt="FWV"
      width={size}
      height={size}
      style={{
        display: 'block',
        borderRadius: size * 0.24,
        boxShadow: 'var(--mark-shadow)',
      }}
    />
  )
}
