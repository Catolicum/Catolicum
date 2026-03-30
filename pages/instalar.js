import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import SidebarClub from "../components/SidebarClub";
import MobileHeader from "../components/MobileHeader";

const PASOS_ANDROID = [
  {
    num: "01",
    titulo: "Abre catolicum.com en Chrome",
    desc: "Asegúrate de usar el navegador Chrome en tu móvil Android.",
    icon: "🌐",
  },
  {
    num: "02",
    titulo: "Toca los 3 puntos del menú",
    desc: "En la esquina superior derecha de Chrome verás tres puntos verticales. Tócalos.",
    icon: "⋮",
  },
  {
    num: "03",
    titulo: 'Selecciona "Añadir a pantalla de inicio"',
    desc: "Aparecerá un menú desplegable. Busca la opción \"Añadir a pantalla de inicio\" y tócala.",
    icon: "📲",
  },
  {
    num: "04",
    titulo: "Confirma el nombre y toca Añadir",
    desc: "Se abrirá un diálogo con el nombre \"Católicum\". Toca \"Añadir\" para confirmar.",
    icon: "✓",
  },
];

const PASOS_IOS = [
  {
    num: "01",
    titulo: "Abre catolicum.com en Safari",
    desc: "La instalación en iPhone solo funciona desde Safari, no desde Chrome ni otros navegadores.",
    icon: "🧭",
  },
  {
    num: "02",
    titulo: "Toca el botón de compartir",
    desc: "En la barra inferior de Safari verás un icono de cuadrado con una flecha hacia arriba. Tócalo.",
    icon: "⬆",
  },
  {
    num: "03",
    titulo: 'Selecciona "Añadir a pantalla de inicio"',
    desc: "En el menú que aparece, desliza hacia abajo y busca \"Añadir a pantalla de inicio\".",
    icon: "📲",
  },
  {
    num: "04",
    titulo: "Toca Añadir",
    desc: "Confirma el nombre \"Católicum\" y toca \"Añadir\" en la esquina superior derecha.",
    icon: "✓",
  },
];

export default function Instalar() {
  const [isMobile, setIsMobile] = useState(false);
  const [platform, setPlatform] = useState("android");

  useEffect(function() {
    function checkMobile() { setIsMobile(window.innerWidth <= 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Detectar plataforma automáticamente
    var ios = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    if (ios) setPlatform("ios");

    return function() { window.removeEventListener("resize", checkMobile); };
  }, []);

  var pasos = platform === "ios" ? PASOS_IOS : PASOS_ANDROID;

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F0", fontFamily: "DM Sans, sans-serif", color: "#1F2937", overflowX: "clip" }}>
      <Head>
        <title>Instalar Católicum - App de lectura católica</title>
        <meta name="description" content="Instala Católicum en tu móvil y accede al club de lectura católico desde tu pantalla de inicio." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {!isMobile && <SidebarClub currentPath="/instalar" />}

        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          {isMobile && <MobileHeader currentPath="/instalar" />}

          {/* HERO */}
          <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: isMobile ? "1.25rem 1.25rem 1rem" : "1.5rem 2rem 1.25rem", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 24 : 30, fontWeight: 400, color: "#FAF7F0", lineHeight: 1.2, marginBottom: ".4rem" }}>
              Instala la app
            </h1>
            <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 14 : 15, fontStyle: "italic", color: "#E1B955", display: "inline-block", padding: "0 1rem", borderLeft: "2px solid #2A4E7F", borderRight: "2px solid #2A4E7F" }}>
              Católicum en tu pantalla de inicio
            </p>
          </div>

          <div style={{ maxWidth: 600, margin: "0 auto", width: "100%", padding: isMobile ? "1.5rem 1rem" : "2.5rem 1.5rem" }}>

            {/* VENTAJAS */}
            <div style={{ background: "#1F3A5F", borderRadius: 14, padding: "1.25rem", marginBottom: "2rem" }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "#8AAFD4", marginBottom: ".75rem" }}>Por qué instalarla</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { icon: "⚡", texto: "Acceso instantáneo desde tu móvil" },
                  { icon: "📵", texto: "Sin pasar por el navegador" },
                  { icon: "🆓", texto: "Gratis, sin App Store" },
                  { icon: "🔔", texto: "Experiencia de app nativa" },
                ].map(function(v) {
                  return (
                    <div key={v.texto} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ fontSize: 16, flexShrink: 0 }}>{v.icon}</span>
                      <span style={{ fontSize: 12, color: "#8AAFD4", lineHeight: 1.4 }}>{v.texto}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SELECTOR PLATAFORMA */}
            <div style={{ display: "flex", gap: 6, marginBottom: "1.5rem" }}>
              <button
                onClick={function() { setPlatform("android"); }}
                style={{ flex: 1, padding: "10px", borderRadius: 10, border: "0.5px solid " + (platform === "android" ? "#1F3A5F" : "#C8D4E0"), background: platform === "android" ? "#1F3A5F" : "#fff", color: platform === "android" ? "#FAF7F0" : "#6E6E73", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}
              >
                🤖 Android
              </button>
              <button
                onClick={function() { setPlatform("ios"); }}
                style={{ flex: 1, padding: "10px", borderRadius: 10, border: "0.5px solid " + (platform === "ios" ? "#1F3A5F" : "#C8D4E0"), background: platform === "ios" ? "#1F3A5F" : "#fff", color: platform === "ios" ? "#FAF7F0" : "#6E6E73", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}
              >
                🍎 iPhone
              </button>
            </div>

            {/* PASOS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "2rem" }}>
              {pasos.map(function(paso, i) {
                return (
                  <div key={i} style={{ display: "flex", gap: 14, background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 12, padding: "1rem 1.25rem", alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#EDF2F8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                      {paso.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 10, fontWeight: 600, color: "#8AAFD4", letterSpacing: ".07em" }}>{paso.num}</span>
                        <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 16, color: "#1F3A5F", fontWeight: 400 }}>{paso.titulo}</span>
                      </div>
                      <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.6, margin: 0 }}>{paso.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* NOTA iOS */}
            {platform === "ios" && (
              <div style={{ background: "#EDF2F8", border: "0.5px solid #C8D4E0", borderRadius: 10, padding: "1rem", marginBottom: "1.5rem" }}>
                <p style={{ fontSize: 13, color: "#1F3A5F", lineHeight: 1.6, margin: 0 }}>
                  <strong>Importante:</strong> en iPhone solo funciona desde Safari. Si usas Chrome u otro navegador, la opción "Añadir a pantalla de inicio" no aparecerá.
                </p>
              </div>
            )}

            {/* CTA volver */}
            <div style={{ textAlign: "center" }}>
              <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 24px", background: "#1F3A5F", color: "#FAF7F0", borderRadius: 10, fontSize: 13, textDecoration: "none", fontFamily: "DM Sans, sans-serif", fontWeight: 500 }}>
                Ir a Católicum →
              </Link>
            </div>

            <div style={{ borderTop: "0.5px solid #D8D0BC", marginTop: "2rem", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#AEAEB2" }}>
              <Link href="/privacidad" style={{ color: "#AEAEB2", textDecoration: "none" }}>Privacidad</Link>
              <span style={{ color: "#D8D0BC" }}>·</span>
              <Link href="/contacto" style={{ color: "#AEAEB2", textDecoration: "none" }}>Contacto</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
