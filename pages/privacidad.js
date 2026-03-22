import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

const CrossIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14">
    <rect x="5.5" y="1" width="3" height="12" rx="1.5" fill="#F5F5F7"/>
    <rect x="1" y="4.5" width="12" height="3" rx="1.5" fill="#F5F5F7"/>
  </svg>
);

const NAV = [
  { label: "Home", href: "/" },
  { label: "Mision", href: "/mision" },
  { label: "Libros recomendados", href: "/recomendados" },
  { label: "Contacto", href: "/contacto" },
];

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
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "DM Sans, sans-serif", color: "#1D1D1F" }}>
      <Head>
        <title>Politica de Privacidad - Catolicum</title>
        <meta name="description" content="Politica de privacidad de Catolicum." />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {!isMobile && (
          <aside style={{ width: 220, flexShrink: 0, background: "#FFFFFF", borderRight: "0.5px solid #D1D1D6", display: "flex", flexDirection: "column", padding: "1.5rem 1rem", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2rem", cursor: "pointer" }}>
                <div style={{ width: 38, height: 38, borderRadius: 9, background: "#1D1D1F", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><CrossIcon /></div>
                <div style={{ width: 1, height: 28, background: "#D1D1D6", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "EB Garamond, serif", fontSize: 19, fontWeight: 500, color: "#1D1D1F", lineHeight: 1.1 }}>Catolicum</div>
                  <div style={{ fontFamily: "EB Garamond, serif", fontSize: 11, fontStyle: "italic", color: "#6E6E73", marginTop: 2 }}>La Libreria Catolica</div>
                </div>
              </div>
            </Link>
            <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
              {NAV.map(function(item) {
                return (<Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", padding: "9px 10px", borderRadius: 8, fontSize: 14, color: "#3A3A3C", textDecoration: "none" }}>{item.label}</Link>);
              })}
            </nav>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: "1rem", borderTop: "0.5px solid #D1D1D6" }}>
              <Link href="/privacidad" style={{ fontSize: 11, color: "#AEAEB2", textDecoration: "none", padding: "3px 0" }}>Privacidad</Link>
              <Link href="/acerca" style={{ fontSize: 11, color: "#AEAEB2", textDecoration: "none", padding: "3px 0" }}>Acerca de</Link>
            </div>
          </aside>
        )}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          {isMobile && (
            <div style={{ background: "#FFFFFF", borderBottom: "0.5px solid #D1D1D6", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
              <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, background: "#1D1D1F", display: "flex", alignItems: "center", justifyContent: "center" }}><CrossIcon /></div>
                <span style={{ fontFamily: "EB Garamond, serif", fontSize: 19, fontWeight: 500, color: "#1D1D1F" }}>Catolicum</span>
              </Link>
              <button onClick={function() { setMenuOpen(!menuOpen); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 5 }}>
                <span style={{ display: "block", width: 18, height: 1.5, background: "#1D1D1F", borderRadius: 1 }} />
                <span style={{ display: "block", width: 18, height: 1.5, background: "#1D1D1F", borderRadius: 1 }} />
                <span style={{ display: "block", width: 18, height: 1.5, background: "#1D1D1F", borderRadius: 1 }} />
              </button>
            </div>
          )}
          {isMobile && menuOpen && (
            <div style={{ background: "#FFFFFF", borderBottom: "0.5px solid #D1D1D6", padding: ".5rem 1rem 1rem" }}>
              {NAV.map(function(item) {
                return (<Link key={item.href} href={item.href} onClick={function() { setMenuOpen(false); }} style={{ display: "block", padding: "10px 0", fontSize: 14, color: "#1D1D1F", textDecoration: "none", borderBottom: "0.5px solid #F5F5F7" }}>{item.label}</Link>);
              })}
            </div>
          )}
          <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "1.25rem 1rem" : "2.5rem 1.5rem", width: "100%" }}>
            <Link href="/" style={{ fontSize: 13, color: "#6E6E73", textDecoration: "none" }}>← Volver</Link>
            <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: 36, fontWeight: 500, margin: "1.5rem 0 .5rem", color: "#1D1D1F" }}>Politica de Privacidad</h1>
            <p style={{ fontSize: 13, color: "#6E6E73", marginBottom: "2rem" }}>Ultima actualizacion: enero 2025</p>
            <h2 style={{ fontFamily: "EB Garamond, serif", fontSize: 20, fontWeight: 500, margin: "1.5rem 0 .5rem", color: "#1D1D1F" }}>1. Quienes somos</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "1rem" }}>Catolicum es un proyecto independiente que ofrece analisis doctrinales de libros desde la perspectiva catolica, basados en fuentes publicas. No esta afiliado a la Iglesia Catolica ni a ninguna institucion religiosa oficial.</p>
            <h2 style={{ fontFamily: "EB Garamond, serif", fontSize: 20, fontWeight: 500, margin: "1.5rem 0 .5rem", color: "#1D1D1F" }}>2. Datos que recopilamos</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "1rem" }}>Catolicum no recopila datos personales de forma directa. No hay registro de usuarios ni busquedas guardadas individualmente.</p>
            <h2 style={{ fontFamily: "EB Garamond, serif", fontSize: 20, fontWeight: 500, margin: "1.5rem 0 .5rem", color: "#1D1D1F" }}>3. Cookies y publicidad</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "1rem" }}>Esta web utiliza Google AdSense para mostrar publicidad. Google puede usar cookies para personalizar los anuncios si el usuario ha dado su consentimiento. Puedes consultar la politica de Google en policies.google.com/privacy.</p>
            <h2 style={{ fontFamily: "EB Garamond, serif", fontSize: 20, fontWeight: 500, margin: "1.5rem 0 .5rem", color: "#1D1D1F" }}>4. Servicios de terceros</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "1rem" }}>La web esta alojada en Vercel, que puede registrar datos tecnicos de acceso con fines de seguridad y rendimiento.</p>
            <h2 style={{ fontFamily: "EB Garamond, serif", fontSize: 20, fontWeight: 500, margin: "1.5rem 0 .5rem", color: "#1D1D1F" }}>5. Cambios en esta politica</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "2rem" }}>Nos reservamos el derecho a actualizar esta politica. Los cambios se publicaran en esta misma pagina.</p>
            <div style={{ borderTop: "0.5px solid #D1D1D6", paddingTop: "1rem", fontSize: 12, color: "#AEAEB2" }}>
              Catolicum — Proyecto independiente, no afiliado a la Iglesia Catolica.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}