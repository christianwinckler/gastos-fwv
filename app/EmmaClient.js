'use client'
import { useEffect } from 'react'

export default function EmmaClient({ user }) {

  const cssContent = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Geist', -apple-system, sans-serif; background: var(--emma-bg); }

:root {
  --emma-accent: #7F77DD;
  --emma-accent-soft: #EEEDFE;
  --emma-accent-mid: #534AB7;
  --emma-accent-light: #CECBF6;
  --emma-bg: #F5F4FB;
  --emma-card: #ffffff;
  --emma-border: rgba(0,0,0,0.06);
  --emma-border-soft: rgba(127,119,221,0.18);
  --emma-fg: #1A1A1A;
  --emma-muted: #888780;
  --emma-sub: #AFA9EC;
  --emma-green: #1D9E75;
  --emma-green-soft: #E1F5EE;
  --emma-red: #c62828;
  --emma-red-soft: #fce4ec;
  --emma-gold: #BA7517;
  --emma-gold-soft: #FAEEDA;
}

.app { display: flex; flex-direction: column; min-height: 100vh; }

.shell { display: grid; grid-template-columns: 72px 1fr; min-height: 100svh; overflow-x: hidden; }
.sidebar {
  background: var(--emma-card); border-right: 1px solid var(--emma-border-soft);
  display: flex; flex-direction: column; align-items: center;
  padding: 22px 0; gap: 4px;
  position: sticky; top: 0; height: 100svh; width: 72px;
  overflow: hidden; transition: width 0.25s cubic-bezier(.4,0,.2,1);
}
.side-label {
  opacity: 0; max-width: 0; overflow: hidden; white-space: nowrap;
  font-size: 12.5px; font-weight: 500; color: var(--emma-fg);
  transition: opacity 0.15s, max-width 0.25s cubic-bezier(.4,0,.2,1);
  pointer-events: none; flex-shrink: 0;
}
.sidebar.expanded { align-items: stretch; padding: 22px 12px; width: 220px; }
.sidebar.expanded .side-icon { width: 100%; justify-content: flex-start; padding: 0 12px; gap: 11px; }
.sidebar.expanded .side-logo { margin-left: 4px; }
.sidebar.expanded .side-label { opacity: 1; max-width: 160px; }
.sidebar.expanded .side-expand-btn { width: 100%; justify-content: flex-start; padding: 0 12px; gap: 11px; }
.sidebar.expanded .side-expand-btn .side-expand-icon { transform: rotate(180deg); }
.side-section-hdr {
  display: none; font-size: 10px; font-weight: 600; color: var(--emma-sub);
  letter-spacing: 0.1em; text-transform: uppercase; padding: 14px 12px 4px;
  white-space: nowrap; overflow: hidden;
}
.sidebar.expanded .side-section-hdr { display: block; }
.side-divider { width: 32px; height: 1px; background: var(--emma-border-soft); margin: 6px auto; flex-shrink: 0; }
.sidebar.expanded .side-divider { width: 100%; margin: 4px 0; }
.side-expand-btn {
  width: 40px; height: 36px; border-radius: 10px; border: none;
  background: transparent; color: var(--emma-sub);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.15s, color 0.15s;
  flex-shrink: 0; margin-top: 6px;
}
.side-expand-btn:hover { background: var(--emma-accent-soft); color: var(--emma-fg); }
.side-expand-icon { width: 16px; height: 16px; flex-shrink: 0; transition: transform 0.25s cubic-bezier(.4,0,.2,1); }
.sidebar-backdrop { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.2); z-index: 199; }
.sidebar-backdrop.visible { display: block; }
.shell-content { display: flex; flex-direction: column; min-width: 0; flex: 1; }

@media (min-width: 921px) {
  .sidebar { position: fixed; left: 0; top: 0; bottom: 0; height: 100dvh; z-index: 30; }
  .shell { grid-template-columns: 1fr; padding-left: 72px; transition: padding-left 0.25s cubic-bezier(.4,0,.2,1); }
  .shell:has(.sidebar.expanded) { padding-left: 220px; }
}

.side-logo {
  width: 36px; height: 36px; border-radius: 10px; margin-bottom: 22px;
  overflow: hidden; cursor: pointer; flex-shrink: 0;
  background: var(--emma-accent-soft);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Instrument Serif', serif; font-size: 20px; color: var(--emma-accent-mid);
}
.side-icon {
  width: 40px; height: 40px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  border: none; background: transparent; color: var(--emma-muted);
  transition: background 0.15s, color 0.15s; cursor: pointer;
}
.side-icon:hover { background: var(--emma-accent-soft); color: var(--emma-fg); }
.side-icon.active { background: var(--emma-accent); color: #fff; box-shadow: 0 4px 10px rgba(127,119,221,0.3); }
.side-icon.active .side-label { color: #fff; }
.side-icon svg { width: 17px; height: 17px; pointer-events: none; flex-shrink: 0; }
.side-spacer { flex: 1; }

@media (min-width: 921px) {
  .sidebar:not(.expanded) .emma-back-link { display: none; }
  .sidebar.expanded .emma-logo-solo { display: none; }
}
@media (max-width: 920px) {
  .emma-logo-solo { display: none; }
}
@media (max-width: 920px) {
  .shell { grid-template-columns: 1fr; }
  .sidebar {
    position: fixed; left: -230px; top: 0; bottom: 0; height: 100dvh !important;
    z-index: 200; width: 220px !important; align-items: stretch; padding: 22px 12px;
    box-shadow: none; transition: left 0.25s cubic-bezier(.4,0,.2,1);
  }
  .sidebar.mobile-open { left: 0; box-shadow: 4px 0 28px rgba(0,0,0,0.12); }
  .sidebar .side-label { opacity: 1 !important; max-width: 160px !important; }
  .sidebar .side-icon { width: 100% !important; justify-content: flex-start !important; padding: 0 12px !important; gap: 11px !important; }
  .sidebar .side-expand-btn { display: none; }
  .sidebar .side-section-hdr { display: block; }
  .sidebar .side-divider { width: 100%; margin: 4px 0; }
  .main { padding: 18px 14px 80px; }
}

.navbar {
  background: var(--emma-card); border-bottom: 0.5px solid var(--emma-border-soft);
  padding: 0 28px; height: 54px;
  display: flex; align-items: center; justify-content: flex-end; gap: 8px;
  position: sticky; top: 0; z-index: 100;
}
.ham-btn {
  width: 38px; height: 38px; border-radius: 10px;
  border: 1px solid var(--emma-border-soft); background: var(--emma-card);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 4px; color: var(--emma-fg); cursor: pointer; margin-right: auto;
}
.ham-btn .ham-line { width: 16px; height: 1.5px; background: currentColor; border-radius: 1px; }
.icon-btn {
  width: 38px; height: 38px; border-radius: 50%;
  border: 1px solid var(--emma-border-soft); background: var(--emma-card);
  color: var(--emma-muted); display: flex; align-items: center; justify-content: center;
  transition: background 0.15s; cursor: pointer;
}
.icon-btn svg { width: 14px; height: 14px; }
.icon-btn.add { background: var(--emma-accent); color: #fff; border: none; font-size: 22px; line-height: 1; padding-bottom: 3px; }

.main { padding: 28px 28px 60px; width: 100%; overflow-x: hidden; }

.greeting { margin-bottom: 24px; }
.greeting h1 {
  font-family: 'Instrument Serif', serif;
  font-size: 38px; line-height: 1.05; font-weight: 400;
  letter-spacing: -0.02em; margin: 0 0 6px; color: var(--emma-fg);
}
.greeting-sub { font-size: 13px; color: var(--emma-muted); }

.accounts-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 16px; }
.acc-card {
  background: var(--emma-card); border: 1px solid var(--emma-border-soft);
  border-radius: 14px; padding: 14px; position: relative;
  display: flex; flex-direction: column; min-height: 110px; min-width: 0;
}
.acc-head { display: flex; align-items: flex-start; gap: 9px; margin-bottom: auto; padding-right: 24px; }
.acc-icon { width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.acc-icon svg { width: 14px; height: 14px; }
.acc-icon.lila { background: var(--emma-accent-soft); color: var(--emma-accent-mid); }
.acc-icon.verde { background: var(--emma-green-soft); color: var(--emma-green); }
.acc-icon.dorado { background: var(--emma-gold-soft); color: var(--emma-gold); }
.acc-icon.azul { background: #E6F1FB; color: #185FA5; }
.acc-name { font-size: 12.5px; font-weight: 500; color: var(--emma-fg); line-height: 1.2; }
.acc-type { font-size: 10.5px; color: var(--emma-sub); letter-spacing: 0.02em; margin-top: 2px; }
.acc-value { font-size: 19px; font-weight: 600; letter-spacing: -0.01em; margin-top: 8px; }
.acc-sub { font-size: 10.5px; color: var(--emma-sub); margin-top: 2px; }
.acc-check {
  position: absolute; top: 12px; right: 12px; width: 18px; height: 18px;
  border-radius: 50%; background: var(--emma-green-soft);
  border: 1px solid #b8dcc7; display: flex; align-items: center;
  justify-content: center; cursor: pointer; padding: 0;
}
.acc-check svg { width: 10px; height: 10px; color: var(--emma-green); }

.info-card {
  background: var(--emma-card); border: 1px solid var(--emma-border-soft);
  border-radius: 14px; padding: 14px; display: flex; flex-direction: column;
  min-height: 110px; position: relative;
  border-left: 3px solid var(--emma-accent-soft); min-width: 0;
}
.info-head { display: flex; align-items: flex-start; gap: 9px; margin-bottom: auto; }
.info-icon { width: 30px; height: 30px; border-radius: 8px; background: var(--emma-accent-soft); color: var(--emma-accent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.info-icon svg { width: 14px; height: 14px; }
.info-name { font-size: 12.5px; font-weight: 500; color: var(--emma-fg); }
.info-type { font-size: 10.5px; color: var(--emma-sub); margin-top: 2px; }
.info-monto { font-size: 19px; font-weight: 600; color: var(--emma-accent); margin-top: 8px; letter-spacing: -0.01em; }
.info-sub { font-size: 10.5px; color: var(--emma-sub); margin-top: 2px; }

.charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }
.card { background: var(--emma-card); border: 1px solid var(--emma-border-soft); border-radius: 16px; padding: 22px 24px; }
.ppto-card { padding: 22px 24px; display: flex; flex-direction: column; }
.ppto-card-label { font-size: 11px; font-weight: 500; color: var(--emma-muted); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px; }
.ppto-bar { height: 8px; background: var(--emma-accent-soft); border-radius: 4px; overflow: hidden; margin-top: 18px; }
.ppto-fill { height: 100%; background: var(--emma-accent); border-radius: 4px; transition: width 0.4s ease; }
.ppto-pct { display: flex; justify-content: space-between; font-size: 12px; margin-top: 8px; }
.ppto-pct-num { color: var(--emma-accent); font-weight: 600; }
.ppto-pct-label { color: var(--emma-sub); }
.donut-card { padding: 22px 24px; }
.donut-body { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.donut-legend { flex: 1; display: flex; flex-direction: column; gap: 9px; min-width: 100px; }
.donut-legend-item { display: flex; align-items: center; gap: 9px; font-size: 12.5px; color: var(--emma-fg); }
.donut-legend-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }

.catkey-section { margin-bottom: 16px; }
.catkey-title { font-size: 11px; font-weight: 500; color: var(--emma-muted); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 10px; padding: 0 4px; }
.catkey-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
.catkey-card { background: var(--emma-card); border: 1px solid var(--emma-border-soft); border-radius: 14px; padding: 14px 16px; min-width: 0; }
.catkey-label { font-size: 10px; font-weight: 500; color: var(--emma-muted); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 7px; }
.catkey-monto { font-size: 18px; font-weight: 600; letter-spacing: -0.01em; }
.catkey-comp { display: flex; align-items: center; gap: 7px; margin-top: 5px; font-size: 11px; }
.catkey-prom { color: var(--emma-sub); }
.delta { font-size: 11px; font-weight: 600; padding: 1px 7px; border-radius: 999px; }
.delta.ok { background: var(--emma-green-soft); color: var(--emma-green); }
.delta.over { background: var(--emma-red-soft); color: var(--emma-red); }
.catkey-bar { margin-top: 9px; height: 4px; background: var(--emma-accent-soft); border-radius: 2px; overflow: hidden; }
.catkey-fill { height: 100%; border-radius: 2px; background: var(--emma-accent); }

.timeline-card { background: var(--emma-card); border: 1px solid var(--emma-border-soft); border-radius: 16px; overflow: hidden; margin-bottom: 16px; }
.tl-header { padding: 14px 20px; border-bottom: 0.5px solid var(--emma-border-soft); display: flex; align-items: center; justify-content: space-between; }
.tl-title { font-size: 13px; font-weight: 500; color: var(--emma-fg); }
.tl-badge-activo { font-size: 10px; padding: 3px 10px; border-radius: 8px; background: var(--emma-accent-soft); color: var(--emma-accent-mid); font-weight: 500; }
.tl-item { display: flex; align-items: center; gap: 14px; padding: 12px 20px; border-bottom: 0.5px solid var(--emma-border-soft); }
.tl-item:last-child { border-bottom: none; }
.tl-item.tl-now { background: var(--emma-accent-soft); }
.tl-time { font-size: 12px; color: var(--emma-muted); width: 44px; flex-shrink: 0; font-weight: 500; }
.tl-dot { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1.5px solid transparent; font-size: 13px; }
.tl-dot.done { background: var(--emma-accent-soft); border-color: var(--emma-accent-light); color: var(--emma-accent); }
.tl-dot.now { background: var(--emma-accent); border-color: var(--emma-accent-mid); color: #fff; }
.tl-dot.pend { background: #f5f5f5; border-color: #e0e0e0; color: #bbb; }
.tl-info { flex: 1; min-width: 0; }
.tl-name { font-size: 13px; font-weight: 500; color: var(--emma-fg); }
.tl-detail { font-size: 11px; color: var(--emma-muted); margin-top: 2px; }
.tl-right { flex-shrink: 0; }
.tl-status { font-size: 12px; font-weight: 500; color: var(--emma-accent); }
.tl-pend { font-size: 12px; color: #bbb; }

.extras-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 18px; }
.extra-item { background: var(--emma-card); border: 1px solid var(--emma-border-soft); border-radius: 12px; padding: 10px 14px; display: flex; align-items: center; gap: 10px; }
.extra-icon { width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
.extra-label { font-size: 13px; font-weight: 500; color: var(--emma-fg); }
.extra-sub { font-size: 10px; color: var(--emma-muted); margin-top: 1px; }
.extra-check { margin-left: auto; width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid #e0e0e0; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 12px; color: #bbb; }
.extra-check.done { border-color: var(--emma-accent); background: var(--emma-accent); color: #fff; }

.screen { display: none; }
.screen.active { display: block; }

.shell-content:has(#screen-home.active) > .navbar { display: none; }
.screen-topbar {
  position: sticky; top: 0; z-index: 90; padding: 16px 16px 8px; background: var(--emma-bg);
}
.screen-topbar-row { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; }
.screen-topbar-left { display: flex; align-items: center; }
.screen-title-wrap { display: flex; justify-content: center; }
.screen-title { font-family: 'Instrument Serif', serif; font-size: 22px; font-weight: 400; letter-spacing: -0.02em; color: var(--emma-fg); white-space: nowrap; }
.screen-topbar-right { display: flex; align-items: center; gap: 7px; justify-content: flex-end; }
@media (min-width: 921px) {
  .screen-topbar-row { display: flex; align-items: center; }
  .screen-topbar-left { display: none; }
  .screen-title-wrap { flex: 1; justify-content: flex-start; }
  .screen-title { font-size: 32px; }
}
@media (min-width: 921px) {
  #screen-home .screen-topbar { display: none; }
}

.toast { position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%); background: var(--emma-accent); color: #fff; padding: 8px 20px; border-radius: 20px; font-size: 13px; white-space: nowrap; z-index: 300; opacity: 0; transition: opacity 0.2s; pointer-events: none; }
.toast.show { opacity: 1; }

@media (max-width: 1024px) { .accounts-grid { grid-template-columns: repeat(2,1fr); } .catkey-grid { grid-template-columns: repeat(2,1fr); } .charts-row { grid-template-columns: 1fr; } }
@media (max-width: 480px) { .accounts-grid { grid-template-columns: repeat(2,1fr); gap: 8px; } .acc-card, .info-card { padding: 10px; min-height: 90px; } .acc-value { font-size: 15px; } .catkey-card { padding: 10px 12px; } .catkey-monto { font-size: 15px; } }
@media (max-width: 768px) { input, select, textarea { font-size: 16px !important; } }

@keyframes spin { to { transform: rotate(360deg); } }
.loading-overlay { display: none; position: fixed; inset: 0; background: rgba(255,255,255,0.92); z-index: 500; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }
  `

  const htmlContent = `
<div class="app">
  <div class="shell">

    <aside class="sidebar" id="emma-sidebar">
      <a href="/home" class="emma-back-link" style="display:flex;align-items:center;gap:10px;
        padding:14px 20px 12px;text-decoration:none;
        border-bottom:0.5px solid rgba(127,119,221,0.15);
        margin:-22px -12px 18px;width:calc(100% + 24px);">
        <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"
          style="width:28px;height:28px;flex-shrink:0;border-radius:7px;overflow:hidden;">
          <rect width="36" height="36" rx="9" fill="#EEEDFE"/>
          <path d="M8 19.5L18 11l10 8.5" stroke="#3C3489" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M11 18v9h14v-9" stroke="#3C3489" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <circle cx="23.5" cy="22" r="2.5" fill="#7F77DD"/>
        </svg>
        <span class="side-label" style="font-size:13px;color:var(--emma-accent);
          font-family:inherit;font-weight:500;">← Volver a Apps</span>
      </a>
      <div class="emma-logo-solo" style="width:36px;height:36px;border-radius:9px;
        background:var(--emma-accent-soft);
        display:flex;align-items:center;justify-content:center;
        font-family:'Instrument Serif',serif;font-size:20px;
        color:var(--emma-accent-mid);margin-bottom:18px;
        cursor:pointer;flex-shrink:0;"
        onclick="window.location='/home'">E</div>

      <div class="side-section-hdr">Comidas</div>
      <button class="side-icon active" data-screen="home" onclick="emmaSwitchScreen('home');emmaCerrarSidebarMobile()" title="Hoy">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21v-7h6v7"/></svg>
        <span class="side-label">Hoy</span>
      </button>
      <button class="side-icon" data-screen="calendario" onclick="emmaSwitchScreen('calendario');emmaCerrarSidebarMobile()" title="Calendario">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        <span class="side-label">Calendario</span>
      </button>
      <button class="side-icon" data-screen="comidas" onclick="emmaSwitchScreen('comidas');emmaCerrarSidebarMobile()" title="Comidas">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v7m0 0c-2.5 0-5 1.5-5 4v9h10v-9c0-2.5-2.5-4-5-4z"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/></svg>
        <span class="side-label">Comidas</span>
      </button>
      <button class="side-icon" data-screen="rutinas" onclick="emmaSwitchScreen('rutinas');emmaCerrarSidebarMobile()" title="Rutinas">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        <span class="side-label">Rutinas</span>
      </button>

      <div class="side-divider"></div>
      <div class="side-section-hdr">Administrador</div>
      <button class="side-icon" data-screen="planes" onclick="emmaSwitchScreen('planes');emmaCerrarSidebarMobile()" title="Planes">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        <span class="side-label">Planes</span>
      </button>
      <button class="side-icon" data-screen="admin" onclick="emmaSwitchScreen('admin');emmaCerrarSidebarMobile()" title="Categorías">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.2"/></svg>
        <span class="side-label">Categorías</span>
      </button>
      <button class="side-icon" data-screen="perfil" onclick="emmaSwitchScreen('perfil');emmaCerrarSidebarMobile()" title="Perfil Emma">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span class="side-label">Perfil Emma</span>
      </button>

      <div class="side-spacer"></div>
      <button class="side-expand-btn" onclick="emmaToggleSidebarExpand()" title="Expandir menú">
        <svg class="side-expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        <span class="side-label">Colapsar</span>
      </button>
    </aside>

    <div class="sidebar-backdrop" id="emma-sidebar-backdrop" onclick="emmaCerrarSidebarMobile()"></div>

    <div class="shell-content">
      <nav class="navbar" id="emma-navbar">
        <button class="ham-btn" onclick="emmaAbrirSidebarMobile()">
          <div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div>
        </button>
        <button class="icon-btn" onclick="emmaActualizarTodo()" title="Actualizar">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8A5.5 5.5 0 1 1 10 3.07"/><path d="M13.5 2v4h-4"/></svg>
        </button>
        <button class="icon-btn add" onclick="emmaAbrirNuevaComida()" title="Nueva comida">+</button>
      </nav>

      <main style="width:100%;overflow-x:hidden;">

        <div class="screen active" id="screen-home">
          <div class="screen-topbar">
            <div class="screen-topbar-row">
              <div class="screen-topbar-left">
                <button class="ham-btn" onclick="emmaAbrirSidebarMobile()">
                  <div class="ham-line"></div>
                  <div class="ham-line"></div>
                  <div class="ham-line"></div>
                </button>
              </div>
              <div class="screen-title-wrap">
                <span class="screen-title" style="font-size:22px;">Emma App</span>
              </div>
              <div class="screen-topbar-right">
                <button class="icon-btn" onclick="emmaActualizarTodo()" title="Actualizar">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8A5.5 5.5 0 1 1 10 3.07"/><path d="M13.5 2v4h-4"/></svg>
                </button>
                <button class="icon-btn add" onclick="emmaAbrirNuevaComida()" title="Nueva comida">+</button>
              </div>
            </div>
          </div>
          <div class="main">
            <div class="greeting">
              <h1 id="emma-greeting">Hola, <i>Emma.</i></h1>
              <div class="greeting-sub">Este es el estado de su alimentación de hoy.</div>
            </div>

            <div class="accounts-grid">
              <div class="acc-card">
                <div class="acc-head">
                  <div class="acc-icon lila">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 2 5 5.5 5 9c0 5 7 13 7 13s7-8 7-13c0-3.5-3-7-7-7z"/></svg>
                  </div>
                  <div><div class="acc-name">Leche</div><div class="acc-type">Tomas del día</div></div>
                </div>
                <div class="acc-value" style="color:var(--emma-accent);">480 cc</div>
                <div class="acc-sub">de 600 cc objetivo</div>
              </div>

              <div class="acc-card">
                <div class="acc-head">
                  <div class="acc-icon verde">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12M5 12H2a10 10 0 0 0 20 0h-3"/><path d="M12 12C12 7 8 4 8 4s0 8 4 8zM12 12C12 7 16 4 16 4s0 8-4 8z"/></svg>
                  </div>
                  <div><div class="acc-name">Sólidos</div><div class="acc-type">Colados del día</div></div>
                </div>
                <div class="acc-value" style="color:var(--emma-green);">215 gr</div>
                <div class="acc-sub">Almuerzo completado</div>
              </div>

              <div class="acc-card">
                <div class="acc-head">
                  <div class="acc-icon dorado">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div><div class="acc-name">Próxima toma</div><div class="acc-type">Postre fruta</div></div>
                </div>
                <div class="acc-value" style="font-size:22px;color:var(--emma-accent);">15:30</div>
                <div class="acc-sub">En 1h 15min</div>
              </div>

              <div class="info-card">
                <div class="info-head">
                  <div class="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  </div>
                  <div><div class="info-name">Comidas completadas</div><div class="info-type">14 mayo 2025</div></div>
                </div>
                <div class="info-monto" style="font-size:28px;font-weight:700;">3 / 6</div>
                <div class="info-sub">del día completadas</div>
              </div>

              <div class="acc-card">
                <div class="acc-head">
                  <div class="acc-icon dorado">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                  </div>
                  <div><div class="acc-name">Pañales hoy</div><div class="acc-type">Registro diario</div></div>
                </div>
                <div class="acc-value" style="color:var(--emma-accent);">5</div>
                <div class="acc-sub">Pipí: 4 · Popó: 1</div>
              </div>

              <div class="info-card">
                <div class="info-head">
                  <div class="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                  </div>
                  <div><div class="info-name">Rutinas extras</div><div class="info-type">Hoy</div></div>
                </div>
                <div class="info-monto">2 / 4</div>
                <div class="info-sub">Vitaminas, ejercicio, ducha</div>
              </div>
            </div>

            <div class="charts-row">
              <div class="card ppto-card">
                <div class="ppto-card-label">Progreso alimentación del día</div>
                <div style="display:flex;justify-content:space-between;align-items:flex-end;">
                  <div><div style="font-size:12px;color:var(--emma-sub);margin-bottom:4px;">Tomado</div><div style="font-size:26px;font-weight:600;letter-spacing:-.02em;">480 cc</div></div>
                  <div style="text-align:right;"><div style="font-size:12px;color:var(--emma-sub);margin-bottom:4px;">Objetivo</div><div style="font-size:26px;font-weight:600;letter-spacing:-.02em;">600 cc</div></div>
                </div>
                <div class="ppto-bar"><div class="ppto-fill" style="width:80%"></div></div>
                <div class="ppto-pct">
                  <span class="ppto-pct-label">del objetivo · 14 mayo</span>
                  <span class="ppto-pct-num">80%</span>
                </div>
              </div>
              <div class="card donut-card">
                <div class="ppto-card-label">Distribución del día</div>
                <div class="donut-body">
                  <svg id="emma-donut-svg" width="130" height="130" viewBox="0 0 130 130" style="flex-shrink:0;"></svg>
                  <div class="donut-legend" id="emma-donut-legend"></div>
                </div>
              </div>
            </div>

            <div class="catkey-section">
              <div class="catkey-title">Resumen del día · 14 mayo</div>
              <div class="catkey-grid">
                <div class="catkey-card">
                  <div class="catkey-label">Leche</div>
                  <div class="catkey-monto">480 cc</div>
                  <div class="catkey-comp"><span class="catkey-prom">obj 600</span><span class="delta ok">80%</span></div>
                  <div class="catkey-bar"><div class="catkey-fill" style="width:80%"></div></div>
                </div>
                <div class="catkey-card">
                  <div class="catkey-label">Sólidos</div>
                  <div class="catkey-monto">215 gr</div>
                  <div class="catkey-comp"><span class="catkey-prom">obj 215</span><span class="delta ok">100%</span></div>
                  <div class="catkey-bar"><div class="catkey-fill" style="width:100%"></div></div>
                </div>
                <div class="catkey-card">
                  <div class="catkey-label">Postre</div>
                  <div class="catkey-monto">0 cc</div>
                  <div class="catkey-comp"><span class="catkey-prom">obj 90</span><span class="delta over">0%</span></div>
                  <div class="catkey-bar"><div class="catkey-fill" style="width:0%"></div></div>
                </div>
                <div class="catkey-card">
                  <div class="catkey-label">Rutinas</div>
                  <div class="catkey-monto">2 / 4</div>
                  <div class="catkey-comp"><span class="catkey-prom">completadas</span><span class="delta ok">50%</span></div>
                  <div class="catkey-bar"><div class="catkey-fill" style="width:50%"></div></div>
                </div>
              </div>
            </div>

            <div style="font-size:11px;font-weight:500;color:var(--emma-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px;padding:0 4px;">
              Tomas del día · Plan mayo 2025
            </div>
            <div class="timeline-card" style="margin-bottom:18px;">
              <div class="tl-header">
                <span class="tl-title">Rutina vigente desde 1 mayo</span>
                <span class="tl-badge-activo">Activo</span>
              </div>
              <div class="tl-item">
                <span class="tl-time">07:00</span>
                <div class="tl-dot done">✓</div>
                <div class="tl-info"><div class="tl-name">Leche mañana · Fórmula</div><div class="tl-detail">120 cc</div></div>
                <div class="tl-right"><div class="tl-status">120 cc ✓</div></div>
              </div>
              <div class="tl-item">
                <span class="tl-time">10:00</span>
                <div class="tl-dot done">✓</div>
                <div class="tl-info"><div class="tl-name">Leche media mañana · Fórmula</div><div class="tl-detail">120 cc</div></div>
                <div class="tl-right"><div class="tl-status">120 cc ✓</div></div>
              </div>
              <div class="tl-item">
                <span class="tl-time">12:30</span>
                <div class="tl-dot done">✓</div>
                <div class="tl-info"><div class="tl-name">Almuerzo · Colado zanahoria + pollo</div><div class="tl-detail">215 gr · Sólido</div></div>
                <div class="tl-right"><div class="tl-status">215 gr ✓</div></div>
              </div>
              <div class="tl-item tl-now">
                <span class="tl-time" style="color:var(--emma-accent);">15:30</span>
                <div class="tl-dot now">⏱</div>
                <div class="tl-info"><div class="tl-name" style="color:var(--emma-accent);">Postre · Fruta colada</div><div class="tl-detail">90 cc · <span style="color:var(--emma-accent);font-weight:500;">Ahora</span></div></div>
                <div class="tl-right"><div class="tl-pend">— cc</div></div>
              </div>
              <div class="tl-item" style="opacity:.6;">
                <span class="tl-time">17:00</span>
                <div class="tl-dot pend">○</div>
                <div class="tl-info"><div class="tl-name">Leche tarde · Fórmula</div><div class="tl-detail">120 cc</div></div>
                <div class="tl-right"><div class="tl-pend">— cc</div></div>
              </div>
              <div class="tl-item" style="opacity:.6;">
                <span class="tl-time">20:00</span>
                <div class="tl-dot pend">○</div>
                <div class="tl-info"><div class="tl-name">Cena · Leche noche</div><div class="tl-detail">150 cc · Fórmula</div></div>
                <div class="tl-right"><div class="tl-pend">— cc</div></div>
              </div>
            </div>

            <div style="font-size:11px;font-weight:500;color:var(--emma-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px;padding:0 4px;">Rutinas del día</div>
            <div class="extras-grid">
              <div class="extra-item">
                <div class="extra-icon" style="background:#E6F1FB;">💊</div>
                <div><div class="extra-label">Vitamina D</div><div class="extra-sub">1 gota · 09:00</div></div>
                <div class="extra-check done" onclick="this.classList.toggle('done');this.textContent=this.classList.contains('done')?'✓':'';">✓</div>
              </div>
              <div class="extra-item">
                <div class="extra-icon" style="background:var(--emma-accent-soft);">🤸</div>
                <div><div class="extra-label">Ejercicio</div><div class="extra-sub">Tummy time</div></div>
                <div class="extra-check" onclick="this.classList.toggle('done');this.textContent=this.classList.contains('done')?'✓':'';"></div>
              </div>
              <div class="extra-item">
                <div class="extra-icon" style="background:var(--emma-green-soft);">🚿</div>
                <div><div class="extra-label">Ducha</div><div class="extra-sub">Tarde</div></div>
                <div class="extra-check" onclick="this.classList.toggle('done');this.textContent=this.classList.contains('done')?'✓':'';"></div>
              </div>
              <div class="extra-item">
                <div class="extra-icon" style="background:var(--emma-gold-soft);">👶</div>
                <div><div class="extra-label">Pañales</div><div class="extra-sub">Pipí: 4 · Popó: 1</div></div>
                <div class="extra-check done" onclick="this.classList.toggle('done');this.textContent=this.classList.contains('done')?'✓':'';">✓</div>
              </div>
            </div>
          </div>
        </div>

        <div class="screen" id="screen-calendario">
          <div class="screen-topbar">
            <div class="screen-topbar-row">
              <div class="screen-topbar-left">
                <button class="ham-btn" onclick="emmaAbrirSidebarMobile()"><div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div></button>
              </div>
              <div class="screen-title-wrap"><span class="screen-title">Calendario Emma</span></div>
              <div class="screen-topbar-right">
                <button class="icon-btn" onclick="emmaActualizarTodo()"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8A5.5 5.5 0 1 1 10 3.07"/><path d="M13.5 2v4h-4"/></svg></button>
              </div>
            </div>
          </div>
          <div class="main" style="padding-top:8px;">
            <div style="background:var(--emma-card);border:1px solid var(--emma-border-soft);border-radius:16px;padding:40px;text-align:center;color:var(--emma-muted);">
              <div style="font-size:32px;margin-bottom:12px;">📅</div>
              <div style="font-size:15px;font-weight:500;color:var(--emma-fg);margin-bottom:6px;">Calendario de rutinas</div>
              <div style="font-size:13px;">Próxima iteración — conectar con Google Sheets</div>
            </div>
          </div>
        </div>

        <div class="screen" id="screen-comidas">
          <div class="screen-topbar">
            <div class="screen-topbar-row">
              <div class="screen-topbar-left">
                <button class="ham-btn" onclick="emmaAbrirSidebarMobile()"><div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div></button>
              </div>
              <div class="screen-title-wrap"><span class="screen-title">Comidas</span></div>
              <div class="screen-topbar-right">
                <button class="icon-btn add" onclick="emmaAbrirNuevaComida()">+</button>
              </div>
            </div>
          </div>
          <div class="main" style="padding-top:8px;">
            <div style="background:var(--emma-card);border:1px solid var(--emma-border-soft);border-radius:16px;padding:40px;text-align:center;color:var(--emma-muted);">
              <div style="font-size:32px;margin-bottom:12px;">🥣</div>
              <div style="font-size:15px;font-weight:500;color:var(--emma-fg);margin-bottom:6px;">Catálogo de comidas</div>
              <div style="font-size:13px;">Próxima iteración — conectar con Google Sheets</div>
            </div>
          </div>
        </div>

        <div class="screen" id="screen-rutinas">
          <div class="screen-topbar">
            <div class="screen-topbar-row">
              <div class="screen-topbar-left">
                <button class="ham-btn" onclick="emmaAbrirSidebarMobile()"><div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div></button>
              </div>
              <div class="screen-title-wrap"><span class="screen-title">Rutinas</span></div>
              <div class="screen-topbar-right"></div>
            </div>
          </div>
          <div class="main" style="padding-top:8px;">
            <div style="background:var(--emma-card);border:1px solid var(--emma-border-soft);border-radius:16px;padding:40px;text-align:center;color:var(--emma-muted);">
              <div style="font-size:32px;margin-bottom:12px;">📋</div>
              <div style="font-size:15px;font-weight:500;color:var(--emma-fg);margin-bottom:6px;">Gestión de rutinas</div>
              <div style="font-size:13px;">Próxima iteración — conectar con Google Sheets</div>
            </div>
          </div>
        </div>

        <div class="screen" id="screen-planes">
          <div class="screen-topbar">
            <div class="screen-topbar-row">
              <div class="screen-topbar-left">
                <button class="ham-btn" onclick="emmaAbrirSidebarMobile()"><div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div></button>
              </div>
              <div class="screen-title-wrap"><span class="screen-title">Planes</span></div>
              <div class="screen-topbar-right"></div>
            </div>
          </div>
          <div class="main" style="padding-top:8px;">
            <div style="background:var(--emma-card);border:1px solid var(--emma-border-soft);border-radius:16px;padding:40px;text-align:center;color:var(--emma-muted);">
              <div style="font-size:32px;margin-bottom:12px;">📄</div>
              <div style="font-size:15px;font-weight:500;color:var(--emma-fg);margin-bottom:6px;">Planes de alimentación</div>
              <div style="font-size:13px;">Próxima iteración — conectar con Google Sheets</div>
            </div>
          </div>
        </div>

        <div class="screen" id="screen-admin">
          <div class="screen-topbar">
            <div class="screen-topbar-row">
              <div class="screen-topbar-left">
                <button class="ham-btn" onclick="emmaAbrirSidebarMobile()"><div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div></button>
              </div>
              <div class="screen-title-wrap"><span class="screen-title">Categorías</span></div>
              <div class="screen-topbar-right"></div>
            </div>
          </div>
          <div class="main" style="padding-top:8px;">
            <div style="background:var(--emma-card);border:1px solid var(--emma-border-soft);border-radius:16px;padding:40px;text-align:center;color:var(--emma-muted);">
              <div style="font-size:32px;margin-bottom:12px;">⚙️</div>
              <div style="font-size:15px;font-weight:500;color:var(--emma-fg);margin-bottom:6px;">Categorías y configuración</div>
              <div style="font-size:13px;">Próxima iteración — conectar con Google Sheets</div>
            </div>
          </div>
        </div>

        <div class="screen" id="screen-perfil">
          <div class="screen-topbar">
            <div class="screen-topbar-row">
              <div class="screen-topbar-left">
                <button class="ham-btn" onclick="emmaAbrirSidebarMobile()"><div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div></button>
              </div>
              <div class="screen-title-wrap"><span class="screen-title">Perfil Emma</span></div>
              <div class="screen-topbar-right"></div>
            </div>
          </div>
          <div class="main" style="padding-top:8px;">
            <div style="background:var(--emma-card);border:1px solid var(--emma-border-soft);border-radius:16px;padding:40px;text-align:center;color:var(--emma-muted);">
              <div style="font-size:32px;margin-bottom:12px;">👶</div>
              <div style="font-size:15px;font-weight:500;color:var(--emma-fg);margin-bottom:6px;">Perfil de Emma</div>
              <div style="font-size:13px;">Próxima iteración — nombre, peso, talla, fecha nacimiento</div>
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
</div>

<div class="toast" id="emma-toast"></div>
<div class="loading-overlay" id="emma-loading">
  <div style="width:36px;height:36px;border:3px solid #e0e0e0;border-top-color:var(--emma-accent);border-radius:50%;animation:spin 0.8s linear infinite;"></div>
  <div style="font-size:14px;color:#666;">Cargando...</div>
</div>
  `

  useEffect(() => {
    if (user?.name) window.emmaUserName = user.name
  }, [user])

  useEffect(() => {
    if (document.getElementById('emma-script')) {
      if (typeof window.emmaCargarDatos === 'function') window.emmaCargarDatos()
      return
    }
    const script = document.createElement('script')
    script.id = 'emma-script'
    script.src = '/emma-script.js?v=' + Date.now()
    document.body.appendChild(script)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssContent }} />
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  )
}
