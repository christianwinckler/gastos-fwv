/* global React */
const { useState, useEffect, useRef } = React;

// ─── Iconos (SVG inline, geom. simples) ────────────────────────
const IconGoogle = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const IconArrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
);

const IconSun = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
);

const IconMoon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

// FWV mark — ícono familia (PNG)
const FwvMark = ({ size = 36, dark = false }) => (
  <img
    src="fwv-icon.png"
    alt="FWV"
    width={size}
    height={size}
    style={{
      display: "block",
      borderRadius: size * 0.24,
      boxShadow: dark
        ? "0 1px 0 rgba(255,255,255,0.06) inset, 0 2px 8px rgba(0,0,0,0.35)"
        : "0 1px 2px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04)",
    }}
  />
);

// ─── LOGIN ─────────────────────────────────────────────────────
function LoginScreen({ dark, setDark, onSignIn, transitioning, accent }) {
  // Paleta cálida: crema (fondo del ícono) + navy (techo) + coral (corazón)
  const bg = dark ? "oklch(0.18 0.012 250)" : "oklch(0.972 0.012 80)";
  const fg = dark ? "oklch(0.96 0.008 80)" : "oklch(0.24 0.025 250)";
  const muted = dark ? "oklch(0.66 0.015 60)" : "oklch(0.50 0.020 250)";
  const sub = dark ? "oklch(0.50 0.012 60)" : "oklch(0.65 0.015 60)";
  const card = dark ? "oklch(0.22 0.012 250)" : "oklch(1 0 0)";
  const border = dark ? "oklch(1 0 0 / 0.08)" : "oklch(0 0 0 / 0.07)";
  const btnBg = dark ? "oklch(0.26 0.010 250)" : "oklch(0.96 0.010 80)";

  return (
    <div
      className="login-root"
      style={{
        position: "absolute", inset: 0,
        background: bg, color: fg,
        display: "flex", flexDirection: "column",
        padding: "32px 24px",
        fontFamily: "'Geist', -apple-system, sans-serif",
        transition: "background 250ms, color 250ms, opacity 400ms, transform 500ms cubic-bezier(.2,.8,.2,1)",
        opacity: transitioning ? 0 : 1,
        transform: transitioning ? "scale(1.02)" : "scale(1)",
      }}
    >
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.14em", color: sub, fontWeight: 500, textTransform: "uppercase" }}>
          FWV · 2026
        </div>
        <button
          onClick={() => setDark(!dark)}
          aria-label="Cambiar tema"
          style={{
            width: 34, height: 34, borderRadius: 11,
            border: `1px solid ${border}`, background: card,
            color: fg, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
        >
          {dark ? <IconSun size={15}/> : <IconMoon size={15}/>}
        </button>
      </div>

      {/* Hero editorial */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 420, margin: "0 auto", width: "100%" }}>
        <div className="login-mark" style={{
          marginBottom: 28,
          transition: "transform 500ms cubic-bezier(.2,.8,.2,1)",
          transform: transitioning ? "translateY(-40px) scale(0.7)" : "none",
        }}>
          <FwvMark size={56} dark={dark}/>
        </div>

        <h1 style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 38, lineHeight: 1.05, fontWeight: 400,
          letterSpacing: "-0.02em",
          margin: 0, marginBottom: 14,
        }}>
          Tu familia,<br/>
          <span style={{ fontStyle: "italic", color: muted }}>en un solo lugar.</span>
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: muted, margin: 0, marginBottom: 36, maxWidth: 320 }}>
          Gastos, alimentación y mucho más — una casa digital para acompañarlos en el día a día.
        </p>

        <button
          onClick={onSignIn}
          style={{
            width: "100%", padding: "14px 18px",
            background: dark ? "oklch(0.96 0.008 80)" : "oklch(0.24 0.025 250)",
            color: dark ? "oklch(0.24 0.025 250)" : "oklch(0.97 0.012 80)",
            border: "none", borderRadius: 14,
            fontFamily: "inherit", fontSize: 14.5, fontWeight: 500,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            transition: "transform 0.15s, opacity 0.15s",
          }}
          onMouseDown={(e)=>e.currentTarget.style.transform="scale(0.98)"}
          onMouseUp={(e)=>e.currentTarget.style.transform="scale(1)"}
        >
          <span style={{
            background: "#fff", borderRadius: "50%", padding: 3,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <IconGoogle size={14}/>
          </span>
          Continuar con Google
        </button>

        <div style={{
          marginTop: 14, fontSize: 12, color: sub,
          display: "flex", alignItems: "center", gap: 6, justifyContent: "center",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, display: "inline-block" }}/>
          Acceso restringido a cuentas autorizadas
        </div>
      </div>

      {/* Footer */}
      <div style={{ fontSize: 11, color: sub, textAlign: "center", letterSpacing: "0.03em" }}>
        FWV App · versión 1.0
      </div>
    </div>
  );
}

// ─── HOME / SELECTOR DE APPS ───────────────────────────────────
function HomeScreen({ dark, onOpenApp, entering, accent, density, user }) {
  const bg = dark ? "oklch(0.18 0.012 250)" : "oklch(0.972 0.012 80)";
  const fg = dark ? "oklch(0.96 0.008 80)" : "oklch(0.24 0.025 250)";
  const muted = dark ? "oklch(0.66 0.015 60)" : "oklch(0.50 0.020 250)";
  const sub = dark ? "oklch(0.50 0.012 60)" : "oklch(0.62 0.015 60)";
  const card = dark ? "oklch(0.23 0.012 250)" : "oklch(1 0 0)";
  const cardHover = dark ? "oklch(0.26 0.012 250)" : "oklch(0.995 0.008 80)";
  const border = dark ? "oklch(1 0 0 / 0.08)" : "oklch(0 0 0 / 0.06)";
  const chipBg = dark ? "oklch(0.26 0.010 250)" : "oklch(0.94 0.012 80)";
  const innerCard = dark ? "oklch(0.20 0.010 250)" : "oklch(0.965 0.012 80)";

  const [hour, setHour] = useState(null);
  useEffect(() => { setHour(new Date().getHours()); }, []);
  const greeting = hour == null ? "Hola"
    : hour < 12 ? "Buenos días" : hour < 20 ? "Buenas tardes" : "Buenas noches";

  // Datos vivos (mockeados realistas para mayo 2026)
  const mes = "Mayo";
  const gastoMes = "$1.847.320";
  const presupuesto = "$2.400.000";
  const pct = 77;

  const gap = density === "compact" ? 10 : density === "spacious" ? 18 : 14;
  const cardPad = density === "compact" ? "18px 18px" : density === "spacious" ? "26px 22px" : "22px 20px";

  return (
    <div
      style={{
        position: "absolute", inset: 0,
        background: bg, color: fg,
        fontFamily: "'Geist', -apple-system, sans-serif",
        overflow: "auto",
        opacity: entering ? 0 : 1,
        transform: entering ? "scale(0.98)" : "scale(1)",
        transition: "opacity 400ms ease, transform 500ms cubic-bezier(.2,.8,.2,1), background 250ms",
      }}
    >
      {/* Top app bar */}
      <div style={{ padding: "20px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <FwvMark size={32} dark={dark}/>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "6px 6px 6px 12px",
          borderRadius: 999,
          background: chipBg,
          fontSize: 12, color: muted,
        }}>
          {user.name.split(" ")[0]}
          {user.image
            ? <img src={user.image} alt="" style={{ width: 26, height: 26, borderRadius: "50%" }}/>
            : <div style={{ width: 26, height: 26, borderRadius: "50%", background: accent, color: "#fff", fontSize: 11, fontWeight: 600, display:"flex", alignItems:"center", justifyContent:"center" }}>
                {user.name.split(" ").map(n=>n[0]).slice(0,2).join("")}
              </div>}
        </div>
      </div>

      {/* Saludo editorial */}
      <div style={{ padding: "28px 22px 22px" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.14em", color: sub, textTransform: "uppercase", fontWeight: 500, marginBottom: 10 }}>
          {greeting}
        </div>
        <h1 style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 36, lineHeight: 1.0, fontWeight: 400,
          letterSpacing: "-0.02em",
          margin: 0, color: fg,
        }}>
          {user.name.split(" ")[0]}, <span style={{ fontStyle: "italic", color: muted }}>buen día.</span>
        </h1>
      </div>

      {/* Sección apps */}
      <div style={{ padding: "0 22px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.14em", color: sub, textTransform: "uppercase", fontWeight: 500 }}>
            Mis apps
          </div>
          <div style={{ fontSize: 11, color: sub }}>3 espacios</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap }}>

          {/* CARD 1 — Gastos (activa, hero) */}
          <button
            onClick={() => onOpenApp("gastos")}
            className="app-card-hero"
            style={{
              all: "unset",
              cursor: "pointer",
              display: "block",
              background: card,
              border: `1px solid ${border}`,
              borderRadius: 22,
              padding: cardPad,
              boxShadow: dark ? "0 1px 0 oklch(1 0 0 / 0.04) inset" : "0 1px 2px oklch(0 0 0 / 0.03)",
              transition: "transform 0.18s ease, background 0.18s",
              position: "relative", overflow: "hidden",
            }}
            onMouseEnter={(e)=>{ e.currentTarget.style.background = cardHover; e.currentTarget.style.transform="translateY(-1px)"; }}
            onMouseLeave={(e)=>{ e.currentTarget.style.background = card; e.currentTarget.style.transform="translateY(0)"; }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: accent, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Instrument Serif', serif", fontSize: 22, fontWeight: 400,
                letterSpacing: "-0.02em",
                boxShadow: `0 6px 14px ${accent}33`,
              }}>
                $
              </div>
            </div>

            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 4 }}>
              Gastos
            </div>
            <div style={{ fontSize: 13.5, color: muted, marginBottom: 18 }}>
              Presupuestos, gastos compartidos y cuotas de tarjeta
            </div>

            {/* KPIs vivas */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              gap: 1, padding: 1,
              background: border, borderRadius: 12, overflow: "hidden",
              marginBottom: 14,
            }}>
              <Stat label="Saldo Santander" value="$1.284K" bg={innerCard} fg={fg} muted={sub}/>
              <Stat label="Saldo Falabella" value="$642K" bg={innerCard} fg={fg} muted={sub}/>
              <Stat label="Últ. Falabella" value="11 · Abr" bg={innerCard} fg={fg} muted={sub}/>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                fontSize: 13, color: fg, fontWeight: 500,
              }}>
                Abrir <IconArrow size={14}/>
              </div>
            </div>
          </button>

          {/* CARD 2 — Calendario Comida (próximamente) */}
          <div style={{
            background: card, border: `1px dashed ${border}`,
            borderRadius: 22, padding: cardPad,
            opacity: 0.85, position: "relative",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: dark ? "oklch(0.30 0.05 195)" : "oklch(0.92 0.04 195)",
                color: dark ? "oklch(0.80 0.08 195)" : "oklch(0.45 0.10 195)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Instrument Serif', serif", fontSize: 20,
              }}>
                ◦
              </div>
              <div style={{
                fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase",
                color: sub, fontWeight: 500,
                padding: "3px 8px", border: `1px solid ${border}`, borderRadius: 999,
              }}>
                Próximamente
              </div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 4 }}>
              Calendario Comida
            </div>
            <div style={{ fontSize: 13, color: muted, marginBottom: 0 }}>
              Planifica menús semanales y lista de compras automática
            </div>
          </div>

          {/* CARD 3 — Slot vacío */}
          <button
            style={{
              all: "unset", cursor: "pointer",
              border: `1px dashed ${border}`, borderRadius: 22,
              padding: cardPad,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              minHeight: 110, gap: 8, color: sub,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e)=>{ e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
            onMouseLeave={(e)=>{ e.currentTarget.style.borderColor = border; e.currentTarget.style.color = sub; }}
          >
            <div style={{ fontSize: 28, fontFamily: "'Instrument Serif', serif", lineHeight: 1, fontWeight: 300 }}>+</div>
            <div style={{ fontSize: 12, letterSpacing: "0.04em" }}>Sugerir nueva app</div>
          </button>

        </div>

        {/* Footer */}
        <div style={{ marginTop: 28, textAlign: "center", fontSize: 11, color: sub, letterSpacing: "0.04em" }}>
          FWV · 2026 · <span style={{ textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" }}>Cerrar sesión</span>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, bg, fg, muted, accent }) {
  return (
    <div style={{ background: bg, padding: "11px 12px" }}>
      <div style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: muted, fontWeight: 500, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.01em", color: accent || fg }}>
        {value}
      </div>
    </div>
  );
}

// ─── GASTOS PLACEHOLDER ────────────────────────────────────────
function GastosPlaceholder({ dark, onBack, entering }) {
  const bg = dark ? "oklch(0.16 0.005 260)" : "oklch(0.985 0.003 80)";
  const fg = dark ? "oklch(0.96 0.005 80)" : "oklch(0.18 0.005 260)";
  const muted = dark ? "oklch(0.62 0.01 260)" : "oklch(0.55 0.01 260)";
  const card = dark ? "oklch(0.21 0.005 260)" : "oklch(1 0 0)";
  const border = dark ? "oklch(1 0 0 / 0.08)" : "oklch(0 0 0 / 0.06)";

  return (
    <div style={{
      position: "absolute", inset: 0, background: bg, color: fg,
      fontFamily: "'Geist', sans-serif",
      padding: "20px 22px",
      opacity: entering ? 0 : 1,
      transform: entering ? "translateY(8px)" : "none",
      transition: "opacity 400ms, transform 400ms cubic-bezier(.2,.8,.2,1)",
    }}>
      <button onClick={onBack} style={{
        all: "unset", cursor: "pointer",
        display: "inline-flex", alignItems: "center", gap: 6,
        fontSize: 13, color: muted, marginBottom: 28,
      }}>
        <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}><IconArrow size={14}/></span>
        Volver
      </button>

      <div style={{
        background: card, border: `1px dashed ${border}`,
        borderRadius: 14, padding: 14, fontSize: 12, color: muted, lineHeight: 1.5,
      }}>
        Vista placeholder · acá conecta el shell completo de la app de gastos.
      </div>
    </div>
  );
}

// ─── APP RAÍZ (con transición) ─────────────────────────────────
function FWVApp({ tweaks }) {
  const [route, setRoute] = useState("login"); // login | home | gastos
  const [dark, setDark] = useState(tweaks.dark);
  const [transitioning, setTransitioning] = useState(false);
  const [entering, setEntering] = useState(false);

  useEffect(() => { setDark(tweaks.dark); }, [tweaks.dark]);

  const user = { name: "Felipe Vergara", image: null };
  const accent = tweaks.accent;

  const goHome = () => {
    setTransitioning(true);
    setTimeout(() => {
      setRoute("home");
      setEntering(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setEntering(false)));
      setTransitioning(false);
    }, 380);
  };

  const goGastos = () => {
    setEntering(true);
    setTimeout(() => {
      setRoute("gastos");
      requestAnimationFrame(() => requestAnimationFrame(() => setEntering(false)));
    }, 50);
  };

  const goBack = () => {
    setEntering(true);
    setTimeout(() => {
      setRoute("home");
      requestAnimationFrame(() => requestAnimationFrame(() => setEntering(false)));
    }, 50);
  };

  return (
    <>
      {route === "login" && (
        <LoginScreen
          dark={dark} setDark={setDark}
          onSignIn={goHome}
          transitioning={transitioning}
          accent={accent}
        />
      )}
      {route === "home" && (
        <HomeScreen
          dark={dark}
          onOpenApp={goGastos}
          entering={entering}
          accent={accent}
          density={tweaks.density}
          user={user}
        />
      )}
      {route === "gastos" && (
        <GastosPlaceholder dark={dark} onBack={goBack} entering={entering}/>
      )}
    </>
  );
}

window.FWVApp = FWVApp;
