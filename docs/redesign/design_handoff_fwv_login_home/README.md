# Handoff: FWV — Login + Home (Selector de Apps)

## Overview

Rediseño de la **puerta de entrada** de la app FWV: pantalla de Login + Home (selector de apps de la familia). FWV es una "casa digital" para la familia — empieza con la app de **Gastos** (presupuestos, gastos compartidos, cuotas de tarjeta) y crecerá hacia más apps (Calendario de Comida, etc.).

El objetivo es transformar la app de "solo gastos" a una **plataforma familiar**, donde Gastos es solo la primera app. El Login + Home establecen este lenguaje.

## About the Design Files

Los archivos en este bundle son **referencias de diseño en HTML** — prototipos que muestran el look-and-feel y comportamiento esperados, **no código de producción para copiar directamente**.

La tarea es **recrear estos diseños en el entorno existente de la app** (React Native / React / etc.) usando los patrones, librerías y design system propios. Si no hay un entorno establecido, elegí el framework más apropiado y aplicá los diseños ahí.

## Fidelity

**Hi-fi (alta fidelidad)**. Los mocks tienen:
- Colores finales (hex/oklch listados abajo)
- Tipografía final (Instrument Serif + Geist)
- Espaciados, radios, sombras finales
- Transiciones e interacciones definidas

Recrear con fidelidad pixel-perfect, adaptando solo lo necesario para el stack del codebase.

---

## Screens / Views

### 1. Login

**Propósito**: punto de entrada. Establece la identidad cálida y familiar de FWV.

**Layout** (mobile, 390×844 — iPhone):
- Pantalla completa, padding `40px 32px 32px`
- Flex column, justify-between
- Top bar con toggle dark/light (top-right)
- Bloque central:
  - Ícono FWV (56×56, PNG family-house, border-radius ~13)
  - Título h1 (Instrument Serif 38px, line-height 1.05): **"Tu familia,"** + en cursiva **"en un solo lugar."**
  - Párrafo (14px, line-height 1.55, color muted): "Gastos, alimentación y mucho más — una casa digital para acompañarlos en el día a día."
  - Botón primario CTA (full-width, padding `14px 18px`, border-radius 14, fondo navy/cream según modo): **"Continuar con Google"** + ícono flecha
  - Sub-link (12.5px, color muted, text-align center): "o ingresar con email"
- Footer (11px, text-align center, color sub): **"FWV App · versión 1.0"**

**Layout desktop**: split 50/50:
- Panel izquierdo (fondo más oscuro, padding 60×56): logo top + hero text bottom + footer (sin barra de Mayo)
- Panel derecho (fondo card): formulario de login centrado (max-width 380), eyebrow "Iniciar sesión" + h2 "Bienvenido de vuelta." + botón

**Interacción**: click en CTA → animación de salida (ícono escala/sube + opacity 0 sobre 500ms) → entra Home con fade-up.

---

### 2. Home (Selector de Apps)

**Propósito**: dashboard familiar. Muestra el saludo, los 3 KPIs principales (en la card de Gastos), y permite seleccionar la app a abrir.

**Layout** (mobile):
- Top app bar (padding `20px 22px 0`):
  - Ícono FWV 32×32 (left)
  - Chip de usuario (right): avatar (28×28, color accent) + nombre + chevron
- Hero greeting (padding `28px 22px 24px`):
  - Eyebrow uppercase (11px, letter-spacing 0.14em): "Buenas tardes"
  - h1 (Instrument Serif 36px, line-height 1.0): **"Felipe,"** + cursiva **"buen día."**
  - **(SIN barra de mes/presupuesto — se removió a propósito)**
- Sección "Mis apps" (padding `0 22px 32px`):
  - Header row: eyebrow "Mis apps" + counter "3 espacios"
  - Stack vertical de 3 cards (gap depende de density):
    1. **Card Gastos (hero, activa)** — ver abajo
    2. **Card Calendario Comida (próximamente)** — ver abajo
    3. **Card slot vacío (sugerir nueva app)** — dashed border, "+" + texto

#### Card Gastos (hero)

- Background: `card`, border `1px solid border`, border-radius 22, padding según density
- Header row (margin-bottom 18):
  - Ícono $ (42×42, border-radius 12, fondo `accent`, color blanco, Instrument Serif 22px, box-shadow `0 6px 14px ${accent}33`)
  - **(SIN badge "En vivo" — se removió)**
- Título (22px, font-weight 600, letter-spacing -0.02em): "Gastos"
- Subtítulo (13.5px, color muted): "Presupuestos, gastos compartidos y cuotas de tarjeta"
- **KPIs vivos** — grid 3 columnas, gap 1, padding 1, fondo `border`, border-radius 12 (efecto divider hairline):
  - **Saldo Santander** — `$1.284K`
  - **Saldo Falabella** — `$642K`
  - **Últ. Falabella** — `11 · Abr`

  Cada `<Stat>`: padding `12px 14px`, fondo `innerCard`. Label uppercase 10px color sub. Value 16px font-weight 600.
- Footer row (justify-end): "Abrir →"

#### Card Calendario Comida (próximamente)

- Background `card`, border `1px dashed border`, border-radius 22, opacity 0.85
- Header row: ícono ◦ (42×42, fondo teal suave) + pill "Próximamente" (10.5px uppercase, border, padding `3px 8px`, border-radius 999) — top-right
- Título (18px, font-weight 600): "Calendario Comida"
- Sub (13px, color muted): "Planifica menús semanales y lista de compras automática"
- **(SIN segundo "Próximamente" abajo — se removió)**

---

### 3. Gastos (placeholder)

Pantalla de transición — no rediseñada en este sprint. Solo:
- Header con back button
- Card placeholder informando: "Vista placeholder · acá conecta el shell completo de la app de gastos."

Cuando se integre, esta ruta debe abrir el shell existente de la app de gastos.

---

## Interactions & Behavior

### Transición Login → Home
1. Al hacer click en CTA, `transitioning = true`
2. El ícono FWV escala a 0.7 + sube 40px + fade-out (500ms cubic-bezier(.2,.8,.2,1))
3. Después de 500ms, `route = "home"` y `entering = true`
4. Home entra con opacity 0 → 1 + translateY 8px → 0 (400ms)

### Transición Home → Gastos
- Misma técnica: fade + slide-up.
- Back button revierte (Home re-entra desde abajo).

### Toggle dark/light
Switch en top-right del login. Persiste en estado y aplica todos los tokens (ver Design Tokens).

---

## State Management

```ts
type Route = "login" | "home" | "gastos";

interface AppState {
  route: Route;
  dark: boolean;            // tema
  transitioning: boolean;   // animación login → home
  entering: boolean;        // fade-in de pantalla nueva
  user: { name: string };   // mock: { name: "Felipe Vergara" }
}

interface Tweaks {
  accent: string;     // default "#e87a6b" (coral)
  density: "comfortable" | "compact";
  dark: boolean;
}
```

KPIs (hardcoded por ahora, conectar a backend luego):
```ts
const kpis = {
  saldoSantander: "$1.284K",
  saldoFalabella: "$642K",
  ultimoFalabella: { dia: 11, mes: "Abr 2026" }, // formato "11 · Abr"
};
```

---

## Design Tokens

### Paleta — derivada del ícono FWV (familia)

| Token              | Light                          | Dark                           |
|--------------------|--------------------------------|--------------------------------|
| `bg`               | `oklch(0.972 0.012 80)` crema  | `oklch(0.18 0.012 250)` navy   |
| `fg`               | `oklch(0.24 0.025 250)` navy   | `oklch(0.96 0.008 80)` crema   |
| `muted`            | `oklch(0.50 0.020 250)`        | `oklch(0.66 0.015 60)`         |
| `sub`              | `oklch(0.62 0.015 60)`         | `oklch(0.50 0.012 60)`         |
| `card`             | `oklch(1 0 0)` blanco          | `oklch(0.23 0.012 250)`        |
| `cardHover`        | `oklch(0.995 0.008 80)`        | `oklch(0.26 0.012 250)`        |
| `innerCard`        | `oklch(0.965 0.012 80)`        | `oklch(0.20 0.010 250)`        |
| `chipBg`           | `oklch(0.94 0.012 80)`         | `oklch(0.26 0.010 250)`        |
| `border`           | `oklch(0 0 0 / 0.06)`          | `oklch(1 0 0 / 0.08)`          |
| `accent` (default) | `#e87a6b` coral                | igual                          |
| `teal` (Calendario)| `oklch(0.92 0.04 195)` bg / `oklch(0.45 0.10 195)` fg | dark: `oklch(0.30 0.05 195)` / `oklch(0.80 0.08 195)` |

**Accent swatches** (selector de tweaks): `#e87a6b` (coral), `#2f8a86` (teal), `#e8a93b` (mostaza), `#2c3e50` (navy), `#7c5cff`, `#16a34a`.

### Tipografía

- **Display / serif**: `Instrument Serif`, weight 400 (regular + italic). Para titulares grandes y números/iconos hero.
- **Texto / sans**: `Geist`, weights 400/500/600. Para body, labels, botones.
- Letter-spacing en titulares serif: `-0.02em` a `-0.025em`.
- Eyebrows uppercase: 10–11px, letter-spacing 0.10em–0.14em.

### Spacing / Radios / Sombras

- Padding cards: `22px` (comfortable) / `18px` (compact).
- Gap entre cards: `14px` / `10px`.
- Radius: cards 22, inner stats 12, chips 999, botones 14, ícono app 12.
- Shadow accent button: `0 6px 14px ${accent}33`.
- Card light: `0 1px 2px oklch(0 0 0 / 0.03)`.
- Card dark: inset `0 1px 0 oklch(1 0 0 / 0.04)`.

---

## Assets

- **`fwv-icon.png`** (incluido) — ícono de la familia (casa con familia + corazón). Usado tanto en login (56×56) como en home top bar (32×32) y en desktop.
- **Tipografías**: Instrument Serif y Geist desde Google Fonts.
- **Sin iconografía externa** más allá de algunos glyphs (◦, →, $) renderizados como texto.

---

## Files

Archivos de referencia en este bundle:

- **`FWV Prototype.html`** — entrada principal. Carga las dependencias (React + Babel + Google Fonts) y renderiza dos artboards (mobile en iOS frame, desktop) en un design canvas. **Acá vive también la versión desktop completa** (componentes `LoginDesktop`, `HomeDesktop`, `DStat`).
- **`fwv-prototype.jsx`** — todos los componentes mobile: `LoginScreen`, `HomeScreen`, `GastosPlaceholder`, `FwvMark`, `Stat`, `IconArrow`, y la app raíz `FWVApp` con la máquina de estado de routing y transiciones.
- **`fwv-icon.png`** — ícono.
- **`tweaks-panel.jsx`** — panel de tweaks (no parte del producto final, solo herramienta de exploración de variantes).
- **`ios-frame.jsx`**, **`design-canvas.jsx`** — chrome para presentar; **no recrear en producción**.

### Por dónde empezar a leer
1. `FWV Prototype.html` líneas ~140–310 — variante desktop completa, fácil de leer.
2. `fwv-prototype.jsx` — componentes mobile en orden: LoginScreen → HomeScreen → GastosPlaceholder → FWVApp.
3. Los valores hardcoded de KPIs viven en `HomeScreen` (línea ~290 aprox), buscar `Saldo Santander`. Reemplazar por props/hook al integrar.

---

## Notas finales

- **No portar** el sistema de tweaks ni el design canvas — son herramientas de exploración.
- **Sí portar** el comportamiento de transición login → home, es parte de la experiencia.
- La integración con la app de Gastos existente: el route `"gastos"` debe simplemente montar el shell actual de `AppClient.js` en lugar del placeholder.
