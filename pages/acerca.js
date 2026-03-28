import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Misión", href: "/mision" },
  { label: "Libros recomendados", href: "/recomendados" },
  { label: "Contacto", href: "/contacto" },
];

function LogoIcon({ size = 36 }) {
  const rx = Math.round(size * 0.22);
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ flexShrink: 0 }}>
      <rect width="64" height="64" rx={rx} fill="#2A4E7F" />
      <rect x="8" y="14" width="21" height="34" rx="3" fill="#16263F" />
      <rect x="10" y="16" width="17" height="30" rx="2" fill="#8AAFD4" />
      <rect x="30" y="14" width="21" height="34" rx="3" fill="#B8922A" />
      <rect x="32" y="16" width="17" height="30" rx="2" fill="#F5E9C0" />
      <rect x="28" y="12" width="4" height="38" rx="2" fill="#0F1E30" />
      <rect x="39" y="21" width="3" height="16" rx="1" fill="#FAF7F0" />
      <rect x="33.5" y="27" width="14" height="3" rx="1" fill="#FAF7F0" />
    </svg>
  );
}

function WordmarkTitle() {
  return (
    <svg width="120" height="26" viewBox="0 0 220 48" style={{ display: "block" }}>
      <text x="0" y="38" fontFamily="'EB Garamond', Georgia, serif" fontSize="36" fill="#FAF7F0" fontWeight="400" letterSpacing="1">Ca</text>
      <rect x="67" y="8" width="4" height="32" rx="2" fill="#E1B955" />
      <rect x="57" y="16" width="22" height="4" rx="2" fill="#E1B955" />
      <text x="83" y="38" fontFamily="'EB Garamond', Georgia, serif" fontSize="36" fill="#FAF7F0" fontWeight="400" letterSpacing="1">olicum</text>
    </svg>
  );
}

function Sidebar() {
  return (
    <aside style={{ width: 220, flexShrink: 0, background: "#1F3A5F", borderRight: "0.5px solid #2A4E7F", display: "flex", flexDirection: "column", padding: "1.5rem 1rem", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "2rem", cursor: "pointer" }}>
          <LogoIcon size={36} />
          <div style={{ width: 1, height: 28, background: "#2A4E7F", flexShrink: 0 }} />
          <WordmarkTitle />
        </div>
      </Link>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {NAV.map(function(item) {
          return (
            <Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", padding: "9px 10px", borderRadius: 8, fontSize: 14, fontFamily: "'EB Garamond', Georgia, serif", color: "#8AAFD4", textDecoration: "none" }}>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: "1rem", borderTop: "0.5px solid #2A4E7F" }}>
        <Link href="/privacidad" style={{ fontSize: 11, color: "#3A5A7A", textDecoration: "none", padding: "3px 0" }}>Privacidad</Link>
        <Link href="/acerca" style={{ fontSize: 11, color: "#3A5A7A", textDecoration: "none", padding: "3px 0" }}>Acerca de</Link>
      </div>
    </aside>
  );
}

function MobileHeader({ menuOpen, setMenuOpen }) {
  return (
    <>
      <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <LogoIcon size={28} />
          <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 19, fontWeight: 500, color: "#FAF7F0" }}>Catolicum</span>
        </Link>
        <button onClick={function() { setMenuOpen(!menuOpen); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ display: "block", width: 18, height: 1.5, background: "#8AAFD4", borderRadius: 1 }} />
          <span style={{ display: "block", width: 18, height: 1.5, background: "#8AAFD4", borderRadius: 1 }} />
          <span style={{ display: "block", width: 18, height: 1.5, background: "#8AAFD4", borderRadius: 1 }} />
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: ".5rem 1rem 1rem" }}>
          {NAV.map(function(item) {
            return (<Link key={item.href} href={item.href} onClick={function() { setMenuOpen(false); }} style={{ display: "block", padding: "10px 0", fontSize: 14, fontFamily: "'EB Garamond', Georgia, serif", color: "#8AAFD4", textDecoration: "none", borderBottom: "0.5px solid #2A4E7F" }}>{item.label}</Link>);
          })}
        </div>
      )}
    </>
  );
}

export default function Acerca() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(function() {
    function checkMobile() { setIsMobile(window.innerWidth <= 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return function() { window.removeEventListener("resize", checkMobile); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F0", fontFamily: "DM Sans, sans-serif", color: "#1F2937" }}>
      <Head>
        <title>Acerca de - Catolicum</title>
        <meta name="description" content="Sobre Catolicum, la librería católica digital de análisis doctrinal de libros." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {!isMobile && <Sidebar />}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          {isMobile && <MobileHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
          <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "1.25rem 1rem" : "2.5rem 1.5rem", width: "100%" }}>
            <Link href="/" style={{ fontSize: 13, color: "#8AAFD4", textDecoration: "none" }}>← Volver</Link>
            <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 36, fontWeight: 400, margin: "1.5rem 0 1rem", color: "#1F3A5F" }}>Acerca de Catolicum</h1>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "#3A3A3C", marginBottom: "1.5rem" }}>Catolicum es una herramienta independiente pensada para ayudar a lectores católicos a conocer si un libro es compatible con la fe antes de leerlo.</p>
            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 24, fontWeight: 400, margin: "2rem 0 .75rem", color: "#1F3A5F" }}>Qué es Catolicum</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "1rem" }}>Una base de datos de libros analizados desde la perspectiva de la doctrina católica. Cada libro recibe una puntuación del 1 al 10 según su alineación con la fe, junto con un análisis detallado y referencias a fuentes públicas.</p>
            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 24, fontWeight: 400, margin: "2rem 0 .75rem", color: "#1F3A5F" }}>Quién lo hace</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "1rem" }}>Catolicum es un proyecto independiente creado por un católico para la comunidad católica. No está afiliado a la Iglesia Católica ni a ninguna institución religiosa oficial.</p>
            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 24, fontWeight: 400, margin: "2rem 0 .75rem", color: "#1F3A5F" }}>Escala de puntuación</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "2rem" }}>
              {[
                { rango: "9-10", label: "Muy afín", color: "#1D9E75", bg: "#EAF3DE", desc: "Plenamente alineado con la doctrina" },
                { rango: "7-8", label: "Favorable", color: "#639922", bg: "#EAF3DE", desc: "Compatible y recomendable" },
                { rango: "5-6", label: "Neutral", color: "#6E6E73", bg: "#F5F5F7", desc: "Sin conflictos doctrinales" },
                { rango: "3-4", label: "Crítico", color: "#BA7517", bg: "#FAEEDA", desc: "Elementos problemáticos" },
                { rango: "1-2", label: "Contrario", color: "#A32D2D", bg: "#FCEBEB", desc: "Incompatible con la doctrina" },
              ].map(function(item) {
                return (
                  <div key={item.rango} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", background: item.bg, borderRadius: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, minWidth: 40, color: item.color }}>{item.rango}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: item.color, minWidth: 80 }}>{item.label}</span>
                    <span style={{ fontSize: 13, color: item.color }}>{item.desc}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ borderTop: "0.5px solid #D8D0BC", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#AEAEB2" }}>
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
