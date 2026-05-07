/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:        'var(--bg)',
        fg:        'var(--fg)',
        muted:     'var(--muted)',
        sub:       'var(--sub)',
        card:      'var(--card)',
        'card-hover': 'var(--card-hover)',
        'inner-card': 'var(--inner-card)',
        'chip-bg': 'var(--chip-bg)',
        border:    'var(--border)',
        accent:    'var(--accent)',
        'teal-bg': 'var(--teal-bg)',
        'teal-fg': 'var(--teal-fg)',
      },
      fontFamily: {
        sans:  ["'Geist'", '-apple-system', 'sans-serif'],
        serif: ["'Instrument Serif'", 'serif'],
      },
      borderRadius: {
        card:   '22px',
        inner:  '14px',
        icon:   '12px',
        chip:   '999px',
        btn:    '11px',
      },
    },
  },
  plugins: [],
}
