# Rediseño del Home (screen-home) — Gastos FWV

## Contexto

Estoy rediseñando solo la pantalla `screen-home` de la app Gastos FWV.
El nuevo diseño está completamente especificado en el archivo de referencia visual:

**`docs/redesign/home-v2/gastos-home-FINAL.html`** (ver archivo adjunto)

Ese HTML es la verdad visual. Replícalo dentro del shell existente
(`app/AppClient.js` + `public/app-script.js`) usando los datos reales de
Google Sheets que ya consume el resto de la app.

## Reglas duras

1. **SOLO modifica estos archivos:**
   - `app/AppClient.js` (CSS dentro de `cssContent` y HTML dentro de `htmlContent`)
   - `public/app-script.js` (lógica de render del home)

2. **NO toques:**
   - Ningún otro screen (`screen-dashboard`, `screen-detalle`, `screen-presupuesto`,
     `screen-admin`, `screen-validacion`, `screen-cuotas`, `screen-historial-cuad`)
   - Las API routes (`app/api/**`)
   - `lib/sheetsService.js`
   - `app/home/**` (esa es la home FWV de apps, no la del módulo Gastos)
   - El drawer existente (sigue usándose)
   - Los modales/overlays (`ov-cuadratura`, `ov-tc-detalle`, etc.)
   - El canvas `cuotasHomeChart` ni el `home-line-chart-canvas` ni los gráficos
     de "Proyección Cuotas TC" ni "Evolución 12 meses" (esos se mantienen igual)

3. **NO cambies funciones globales** ni renombres IDs que estén siendo usados por
   `app-script.js`. Si necesitas IDs nuevos para los nuevos bloques, inventa
   nombres que no choquen con los existentes.

4. **Mantén toda la funcionalidad actual:**
   - Botones de cuadratura (clase `cuad-check-btn` → mantener `onclick="abrirCuadratura(...)"`)
   - Botón ojito (`toggleEyeAll`)
   - Botón "+" nuevo gasto (`abrirNuevoGasto`)
   - Botón detalle TC (`abrirDetalleTarjeta`)
   - Hamburguesa abre el drawer existente
   - Skeletons mientras cargan los datos

## Cambios visuales (resumen)

### Sidebar lateral fija (NUEVO, solo desktop ≥920px)
Agregar una sidebar de 72px de ancho con íconos verticales para navegación rápida:
Resumen (activo), Detalle, Validación, Cuotas, Categorías. En mobile la sidebar
se oculta y se mantiene solo el drawer (hamburguesa).

### Topbar reorganizada
- Hamburguesa a la izquierda (siempre visible, abre el drawer existente con TODOS los links)
- A la derecha: ojo (toggleEyeAll), notificaciones (placeholder, sin onclick),
  botón "+" coral (nuevo gasto), avatar con inicial

### Saludo serif
Header tipo editorial: `<h1>Buenas tardes, <i>Christian.</i></h1>` en
Instrument Serif 38px, con subtítulo "Este es el estado de tus finanzas."
en Geist 13px gris.

El saludo debe variar según la hora ("Buenos días" / "Buenas tardes" / "Buenas
noches") usando la misma lógica que ya existe en `app/home/HomeHeader.js`.
Usa el primer nombre del usuario (`session.user.name.split(' ')[0]`).
Si el nombre del usuario no está disponible en `app-script.js`, expónlo desde
`AppClient.js` como atributo `data-user-name` en algún elemento del shell, o
como variable global `window.userName`.

### Grilla de cuentas 3×2 (6 cards)
Reemplazar la sección actual de KPIs (Santander, Cuenta Vista, Falabella,
Tarjeta de Crédito, Último mes Falabella en formato `kpi-grid-2` y `kpi-card-full`)
por una grilla 3×2 con estas 6 cards en este orden exacto:

**Fila 1:**
1. Santander (cuenta corriente) — saldo + botón cuadratura
2. Cuenta Vista (ahorros) — saldo + botón cuadratura
3. Falabella (cuenta corriente) — saldo + botón cuadratura

**Fila 2:**
4. **Último mes Falabella** (info-card, sin saldo, sin cuadratura) — número
   grande coral con "11 compras", subtítulo con el mes ("Abril 2026")
5. Tarjeta Crédito (Falabella) — saldo disponible real + botón cuadratura
6. **Cuotas Próximo Mes** (info-card, sin saldo, sin cuadratura) — muestra
   el monto total a pagar el mes siguiente. Estructura:
   - Título: "Cuotas Próximo Mes"
   - Subtítulo: nombre del mes siguiente al actual (ej: "Junio 2026")
   - Monto grande coral: suma de los `valor cuota` de **todas las cuotas
     activas** que tengan que pagarse el mes siguiente
   - Subtítulo final: "Total a pagar en cuotas"

   Cálculo: usa los datos que ya carga `getCuotas()` en `app-script.js`.
   Filtra las cuotas donde `próximoVencimiento` cae en el mes siguiente al actual,
   y suma sus `valorCuota`. Si no hay cuotas el próximo mes, muestra `$0`.

**Distinción visual:**
- Cards de cuentas reales (1, 2, 3, 5): fondo blanco sólido, ícono colorido
  del banco, saldo en color del texto principal, botón de cuadratura verde arriba derecha
- Cards de info derivada (4, 6): fondo blanco con `border-left: 3px solid var(--accent-soft)`,
  ícono coral suave, número/monto en color coral (`var(--accent)`), SIN botón de cuadratura

### Presupuesto vs Real + Donut (lado a lado)
Reemplazar la sección actual de "CATEGORÍAS CLAVE" (que está arriba en el
home actual) por una fila de 2 columnas:

**Izquierda — Presupuesto vs Real:** card grande con:
- Label "PRESUPUESTO VS REAL"
- Dos columnas con `Gastado $X.XXX.XXX` y `Presupuesto $X.XXX.XXX`
- Barra de progreso coral con el porcentaje gastado vs presupuesto
- Pie con "del presupuesto · [Mes Año]" + porcentaje

**Derecha — Distribución del gasto:** card grande con:
- Título "Distribución del gasto"
- Donut SVG (150×150) con segmentos en gama coral/taupe
- Centro del donut: TOTAL + monto + mes
- Leyenda lateral con top 5 categorías (nombre + %)
- Footer "Ver todas →" en coral

Los datos vienen de las mismas estructuras que ya tienes; reusa las funciones
de cálculo existentes que llenan `dashData` o equivalente.

### Categorías clave (debajo, fila completa de 4)
Mantener las 4 cards actuales (Cuentas, Supermercado, Mall, Salidas a Comer)
pero rediseñarlas con el nuevo estilo (`catkey-card` en el mockup): nombre en
mayúsculas pequeñas, monto grande, comparación contra promedio + delta pill,
mini-barra de progreso. Mantener toda la lógica de cálculo actual.

### Proyección Cuotas TC (sin cambios funcionales, solo wrapper visual)
Mantener el bloque `cuotas-home-chart-wrap` exactamente como está, dentro
de una card con border-radius 16px y padding consistente con el nuevo diseño.

### Evolución 12 meses (sin cambios funcionales, solo wrapper visual)
Mantener `home-line-chart-canvas` y los filtros de categoría/subcategoría
exactamente como están, dentro de una card con el nuevo estilo.

## Tokens de diseño (usar variables CSS existentes en `app/globals.css`)

El nuevo diseño usa estas variables que YA existen:
- `--bg`, `--fg`, `--muted`, `--sub`, `--card`, `--inner-card`, `--chip-bg`,
  `--border`, `--accent`

Variables nuevas a agregar en `app/globals.css` `:root` (NO sobreescribir las
existentes; agregar al final):
- `--border-soft: rgba(0,0,0,0.045);`
- `--accent-soft: #fdebe7;`
- `--green: #2e9b6f;`
- `--green-soft: #e3f3eb;`
- `--gold-bg: #fdf3df;`
- `--gold-fg: #c98a1a;`

Y para dark mode en `html.dark`:
- `--border-soft: rgba(255,255,255,0.06);`
- `--accent-soft: oklch(0.30 0.06 30);`
- `--green: oklch(0.70 0.10 160);`
- `--green-soft: oklch(0.28 0.04 160);`
- `--gold-bg: oklch(0.30 0.04 80);`
- `--gold-fg: oklch(0.78 0.10 80);`

## Tipografía

- Títulos hero: **Instrument Serif** (ya cargada en `app/layout.js`)
- Cuerpo: **Geist** (ya cargada)
- Tamaños del saludo: 38px desktop, 30px mobile, line-height 1.05, weight 400,
  letter-spacing -0.02em

## Responsive

- Desktop ≥1025px: sidebar visible, accounts 3×2, charts-row 1×2, catkey 1×4
- Tablet 921-1024px: sidebar visible, accounts 2×3, charts-row 1×1, catkey 1×2
- Mobile ≤920px: sidebar oculta (solo drawer/hamburguesa), accounts 2×3, todo en columna
- Mobile pequeño ≤480px: accounts 1×6

## Pasos sugeridos

1. Leer `app/AppClient.js` y entender los strings `cssContent` y `htmlContent`,
   y dónde está actualmente `<div class="screen active" id="screen-home">`.

2. Leer `public/app-script.js` para ver:
   - Qué función renderiza el home (probablemente `renderHome()` o similar)
   - Qué IDs lee/escribe del DOM del home
   - Cómo se obtienen los datos de cuotas (próximas a pagar)

3. Agregar las variables CSS nuevas en `app/globals.css`.

4. Reemplazar el CSS del home dentro de `cssContent` en `AppClient.js`:
   - Eliminar/reemplazar las clases viejas usadas SOLO por el home actual
     (`.kpi-grid-2`, `.kpi-card`, `.kpi-card-full`, `.kpi-card-falabella`,
     `.cat-kpi-grid`, `.cat-kpi-card`, etc.) — pero **verifica antes** que esas
     clases no se usen en otro lado de la app
   - Agregar las nuevas: `.shell`, `.sidebar`, `.side-icon`, `.main`, `.topbar`,
     `.greeting`, `.accounts-grid`, `.acc-card`, `.info-card`, `.charts-row`,
     `.ppto-card`, `.donut-card`, `.catkey-section`, `.catkey-grid`,
     `.catkey-card`, `.delta`, etc. (copiar exactos del mockup de referencia)

5. Reemplazar el HTML del `<div id="screen-home">` con la nueva estructura del
   mockup, **conservando**:
   - Los IDs que el JS ya usa para inyectar datos (renombra los IDs viejos
     que ya no existen y crea nuevos consistentes con el mockup)
   - Los `onclick="abrirCuadratura('...')"` en cada card de cuenta real
   - El canvas `cuotasHomeChart` y `home-line-chart-canvas`
   - Los inputs/dropdowns de filtro de evolución 12m

6. Actualizar `public/app-script.js`:
   - La función que renderiza el home debe llenar los nuevos IDs:
     - Saludo dinámico (hora + nombre)
     - 4 cards de cuentas con saldo (Santander, Cuenta Vista, Falabella, TC)
     - Card de "Último mes Falabella" con número de compras del mes y mes/año
     - Card de "Cuotas Próximo Mes" con monto total y nombre del mes siguiente
     - Card "Presupuesto vs Real" con gastado/presupuesto/% del mes actual
     - Donut "Distribución del gasto" con top 5 categorías + segmentos SVG
       calculados dinámicamente
     - 4 cards de "Categorías Clave" (manteniendo cálculo actual)

7. Verificar en local (`npm run dev -- -H 0.0.0.0`) que:
   - Login funciona
   - Datos cargan
   - Botones de cuadratura abren el modal
   - Botón "+" abre el formulario nuevo gasto
   - Hamburguesa abre el drawer
   - Otros screens (Detalle, Presupuesto, Admin, etc.) siguen funcionando intactos
   - Mobile responsive funciona (la sidebar se oculta y queda solo la hamburguesa)
   - Dark mode (si está activo) muestra los colores correctos

## Importante sobre estructura de archivos

`AppClient.js` actualmente tiene tres bloques tipo template literal:
- `cssContent` (string CSS que se inyecta como `<style>`)
- `htmlContent` (string HTML que se inyecta como `dangerouslySetInnerHTML`)
- `jsContent_UNUSED` (legacy, no se usa, no tocar)

Y al final del componente hay un `useEffect` que carga `/app-script.js`.

Mantén exactamente esa misma arquitectura.

## Entregable

Solo los cambios scoped a:
- `app/AppClient.js`
- `public/app-script.js`
- `app/globals.css` (solo agregar variables nuevas)

No modifiques nada más. Si encuentras que algo te requiere tocar otro archivo,
detente y avísame antes de proceder.
