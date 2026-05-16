// ── EXPONER FUNCIONES GLOBALES ────────────────────────────
window.emmaSwitchScreen = emmaSwitchScreen
window.emmaToggleSidebarExpand = emmaToggleSidebarExpand
window.emmaAbrirSidebarMobile = emmaAbrirSidebarMobile
window.emmaCerrarSidebarMobile = emmaCerrarSidebarMobile
window.emmaActualizarTodo = emmaActualizarTodo
window.emmaAbrirNuevaComida = emmaAbrirNuevaComida
window.emmaCargarDatos = emmaCargarDatos

// ── NAVEGACIÓN ────────────────────────────────────────────
const emmaScreenToPath = {
  home:       '/emma',
  calendario: '/emma/calendario',
  comidas:    '/emma/comidas',
  rutinas:    '/emma/rutinas',
  planes:     '/emma/planes',
  admin:      '/emma/categorias',
  perfil:     '/emma/perfil',
}
const emmaPathToScreen = Object.fromEntries(
  Object.entries(emmaScreenToPath).map(([k, v]) => [v, k])
)

function emmaSwitchScreen(screen, pushHistory = true) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'))
  const el = document.getElementById('screen-' + screen)
  if (el) el.classList.add('active')

  document.querySelectorAll('.side-icon').forEach(l => {
    l.classList.toggle('active', l.dataset.screen === screen)
  })

  window.scrollTo(0, 0)

  if (pushHistory) {
    history.pushState({ screen }, '', emmaScreenToPath[screen] || '/emma')
  }
}

window.addEventListener('popstate', e => {
  const screen = (e.state && e.state.screen) || emmaPathToScreen[location.pathname] || 'home'
  emmaSwitchScreen(screen, false)
})

;(function emmaInitFromUrl() {
  const screen = emmaPathToScreen[location.pathname] || 'home'
  if (screen !== 'home') emmaSwitchScreen(screen, false)
  history.replaceState({ screen }, '', emmaScreenToPath[screen] || '/emma')
})()

// ── SIDEBAR ───────────────────────────────────────────────
function emmaToggleSidebarExpand() {
  const sb = document.getElementById('emma-sidebar')
  if (!sb) return
  sb.classList.toggle('expanded')
  try { localStorage.setItem('fwv_emma_sb_exp', sb.classList.contains('expanded') ? '1' : '0') } catch (e) {}
}

function emmaAbrirSidebarMobile() {
  const sb = document.getElementById('emma-sidebar')
  const bd = document.getElementById('emma-sidebar-backdrop')
  if (sb) sb.classList.add('mobile-open')
  if (bd) bd.classList.add('visible')
  document.body.style.overflow = 'hidden'
}

function emmaCerrarSidebarMobile() {
  const sb = document.getElementById('emma-sidebar')
  const bd = document.getElementById('emma-sidebar-backdrop')
  if (sb) sb.classList.remove('mobile-open')
  if (bd) bd.classList.remove('visible')
  document.body.style.overflow = ''
}

// Restaurar estado expandido
try {
  const sb = document.getElementById('emma-sidebar')
  if (sb && localStorage.getItem('fwv_emma_sb_exp') === '1') sb.classList.add('expanded')
} catch (e) {}

// ── TOAST ─────────────────────────────────────────────────
function emmaMostrarToast(msg) {
  const t = document.getElementById('emma-toast')
  if (!t) return
  t.textContent = msg
  t.classList.add('show')
  setTimeout(() => t.classList.remove('show'), 2500)
}

// ── LOADING ───────────────────────────────────────────────
function emmaMostrarLoading() {
  const el = document.getElementById('emma-loading')
  if (el) el.style.display = 'flex'
}
function emmaOcultarLoading() {
  const el = document.getElementById('emma-loading')
  if (el) el.style.display = 'none'
}

// ── DATOS (mock estático por ahora) ───────────────────────
async function emmaCargarDatos() {
  emmaMostrarLoading()
  emmaOcultarLoading()
  emmaRenderDonut()
}

// ── DONUT ─────────────────────────────────────────────────
function emmaRenderDonut() {
  const svg = document.getElementById('emma-donut-svg')
  const legend = document.getElementById('emma-donut-legend')
  if (!svg || !legend) return

  const data = [
    { label: 'Leche', pct: 69, color: '#7F77DD' },
    { label: 'Sólido', pct: 21, color: '#1D9E75' },
    { label: 'Postre', pct: 10, color: '#BA7517' },
  ]
  const R = 45, CX = 65, CY = 65, STROKE = 18
  const total = 251.2 // 2πR
  let offset = 0
  let paths = ''
  data.forEach(d => {
    const dash = (d.pct / 100) * total
    paths += `<circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="${d.color}" stroke-width="${STROKE}" stroke-dasharray="${dash} ${total}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${CX} ${CY})"/>`
    offset += dash
  })
  svg.innerHTML = paths +
    `<circle cx="${CX}" cy="${CY}" r="${R - STROKE / 2 - 2}" fill="#F5F4FB"/>` +
    `<text x="${CX}" y="${CY - 6}" text-anchor="middle" font-size="9" fill="#888">HOY</text>` +
    `<text x="${CX}" y="${CY + 8}" text-anchor="middle" font-size="13" font-weight="600" fill="#1A1A1A">695cc</text>` +
    `<text x="${CX}" y="${CY + 20}" text-anchor="middle" font-size="9" fill="#AFA9EC">total</text>`

  legend.innerHTML = data.map(d => `
    <div class="donut-legend-item">
      <div class="donut-legend-dot" style="background:${d.color}"></div>
      <span>${d.label} · ${d.pct}%</span>
    </div>`).join('')
}

// ── ACCIONES ──────────────────────────────────────────────
function emmaActualizarTodo() {
  emmaMostrarToast('Datos actualizados ✓')
}

function emmaAbrirNuevaComida() {
  emmaMostrarToast('Próximamente: nueva comida')
}

// ── INIT ──────────────────────────────────────────────────
emmaCargarDatos()
