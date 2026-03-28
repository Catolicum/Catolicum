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

export default function Privacidad() {
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
        <title>Política de Privacidad - Catolicum</title>
        <meta name="description" content="Política de privacidad de Catolicum." />
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
            <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 36, fontWeight: 400, margin: "1.5rem 0 .5rem", color: "#1F3A5F" }}>Política de Privacidad</h1>
            <p style={{ fontSize: 13, color: "#6E6E73", marginBottom: "2rem" }}>Última actualización: enero 2025</p>
            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 20, fontWeight: 400, margin: "1.5rem 0 .5rem", color: "#1F3A5F" }}>1. Quiénes somos</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "1rem" }}>Catolicum es un proyecto independiente que ofrece análisis doctrinales de libros desde la perspectiva católica, basados en fuentes públicas. No está afiliado a la Iglesia Católica ni a ninguna institución religiosa oficial.</p>
            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 20, fontWeight: 400, margin: "1.5rem 0 .5rem", color: "#1F3A5F" }}>2. Datos que recopilamos</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "1rem" }}>Catolicum no recopila datos personales de forma directa. No hay registro de usuarios ni búsquedas guardadas individualmente.</p>
            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 20, fontWeight: 400, margin: "1.5rem 0 .5rem", color: "#1F3A5F" }}>3. Cookies y publicidad</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "1rem" }}>Esta web utiliza Google AdSense para mostrar publicidad. Google puede usar cookies para personalizar los anuncios si el usuario ha dado su consentimiento. Puedes consultar la política de Google en policies.google.com/privacy.</p>
            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 20, fontWeight: 400, margin: "1.5rem 0 .5rem", color: "#1F3A5F" }}>4. Servicios de terceros</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "1rem" }}>La web está alojada en Vercel, que puede registrar datos técnicos de acceso con fines de seguridad y rendimiento.</p>
            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 20, fontWeight: 400, margin: "1.5rem 0 .5rem", color: "#1F3A5F" }}>5. Cambios en esta política</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "2rem" }}>Nos reservamos el derecho a actualizar esta política. Los cambios se publicarán en esta misma página.</p>
            <div style={{ borderTop: "0.5px solid #D8D0BC", paddingTop: "1rem", fontSize: 12, color: "#AEAEB2" }}>
              Catolicum — Proyecto independiente, no afiliado a la Iglesia Católica.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
