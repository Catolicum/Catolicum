import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getRecomendados } from "../lib/search";

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

function getScoreStyle(s) {
  if (s >= 9) return { color: "#1D9E75", bg: "#EAF3DE", text: "#085041", label: "Muy afin" };
  if (s >= 7) return { color: "#639922", bg: "#EAF3DE", text: "#27500A", label: "Favorable" };
  return { color: "#6E6E73", bg: "#F5F5F7", text: "#3A3A3C", label: "Neutral" };
}

function toSlug(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function Recomendados() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function() {
    function checkMobile() { setIsMobile(window.innerWidth <= 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    getRecomendados().then(function(data) { setLibros(data); setLoading(false); });
    return function() { window.removeEventListener("resize", checkMobile); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "DM Sans, sans-serif", color: "#1D1D1F" }}>
      <Head>
        <title>Libros Recomendados - Catolicum</title>
        <meta name="description" content="Los mejores libros para lectores catolicos. Seleccion de obras compatibles con la fe." />
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
            <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: 36, fontWeight: 500, margin: "1.5rem 0 .5rem", color: "#1D1D1F" }}>Libros recomendados</h1>
            <p style={{ fontSize: 14, color: "#6E6E73", marginBottom: "2rem", lineHeight: 1.6 }}>Seleccion de libros compatibles o plenamente alineados con la fe catolica. Puntuacion 7 o superior.</p>
            {loading ? (
              <div style={{ textAlign: "center", padding: "2rem", color: "#6E6E73", fontSize: 14 }}>Cargando...</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
                {libros.map(function(b) {
                  var st = getScoreStyle(b.s);
                  var url = "https://www.amazon.es/s?k=" + encodeURIComponent(b.t + " " + b.a) + "&tag=catolicum-21";
                  return (
                    <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 12, background: "#FFFFFF", border: "0.5px solid #D1D1D6", borderRadius: 10, padding: ".75rem 1rem" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: st.bg, color: st.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 500, flexShrink: 0 }}>{b.s}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Link href={"/libro/" + toSlug(b.t)} style={{ textDecoration: "none" }}>
                          <div style={{ fontSize: 13, fontWeight: 500, color: "#1D1D1F", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.t}</div>
                        </Link>
                        <div style={{ fontSize: 12, color: "#6E6E73" }}>{b.a}</div>
                      </div>
                      <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, padding: "5px 10px", border: "0.5px solid #D1D1D6", borderRadius: 6, color: "#3A3A3C", textDecoration: "none", flexShrink: 0, background: "#F5F5F7" }}>Amazon</a>
                    </div>
                  );
                })}
              </div>
            )}
            <div style={{ borderTop: "0.5px solid #D1D1D6", marginTop: "2rem", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#AEAEB2" }}>
              <Link href="/privacidad" style={{ color: "#AEAEB2", textDecoration: "none" }}>Privacidad</Link>
              <span>·</span>
              <Link href="/contacto" style={{ color: "#AEAEB2", textDecoration: "none" }}>Contacto</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}