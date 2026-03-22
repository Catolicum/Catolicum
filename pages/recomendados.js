import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getRecomendadosRicos } from "../lib/search";

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

function toSlug(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getScoreStyle(s) {
  if (s >= 9) return { color: "#1D9E75", bg: "#EAF3DE", text: "#085041", label: "Muy afin" };
  if (s >= 7) return { color: "#639922", bg: "#EAF3DE", text: "#27500A", label: "Favorable" };
  return { color: "#6E6E73", bg: "#F5F5F7", text: "#3A3A3C", label: "Neutral" };
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
    getRecomendadosRicos().then(function(data) {
      setLibros(data);
      setLoading(false);
    });
    return function() { window.removeEventListener("resize", checkMobile); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "DM Sans, sans-serif", color: "#1D1D1F" }}>
      <Head>
        <title>Libros Recomendados para Catolicos - Catolicum</title>
        <meta name="description" content="Seleccion de libros recomendados para lectores catolicos. Analisis detallado con puntos fuertes debiles y para quien es cada libro." />
        <meta name="keywords" content="libros catolicos recomendados, libros espiritualidad catolica, lecturas recomendadas catolicos" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.catolicum.com/recomendados" />
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

          <div style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "1.25rem 1rem" : "2.5rem 1.5rem", width: "100%" }}>

            <Link href="/" style={{ fontSize: 13, color: "#6E6E73", textDecoration: "none" }}>← Volver</Link>
            <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: 36, fontWeight: 500, margin: "1.5rem 0 .5rem", color: "#1D1D1F" }}>Libros recomendados</h1>
            <p style={{ fontSize: 14, color: "#6E6E73", marginBottom: "2rem", lineHeight: 1.6 }}>
              Una seleccion personal de libros que pueden enriquecer tu fe y acompañarte en distintos momentos de la vida. Cada libro incluye analisis detallado para quien es y cuando puede ayudarte.
            </p>

            {loading ? (
              <div style={{ textAlign: "center", padding: "2rem", color: "#6E6E73", fontSize: 14 }}>Cargando...</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {libros.map(function(b) {
                  var st = getScoreStyle(b.puntuacion);
                  var slug = toSlug(b.titulo);
                  return (
                    <Link key={b.titulo} href={"/recomendados/" + slug} style={{ textDecoration: "none", color: "inherit" }}>
                      <div style={{ background: "#FFFFFF", border: "0.5px solid #D1D1D6", borderRadius: 12, padding: "1.25rem", display: "flex", gap: 16, alignItems: "flex-start", cursor: "pointer", transition: "border-color .15s" }}>

                        <div style={{ flexShrink: 0 }}>
                          {b.imagen_url ? (
                            <img src={b.imagen_url} alt={"Portada " + b.titulo} style={{ width: 70, borderRadius: 6, display: "block", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }} />
                          ) : (
                            <div style={{ width: 70, height: 100, borderRadius: 6, background: "#1D1D1F", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <CrossIcon />
                            </div>
                          )}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
                            <div>
                              <p style={{ fontSize: 11, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 3 }}>{b.categoria}</p>
                              <h2 style={{ fontFamily: "EB Garamond, serif", fontSize: 18, fontWeight: 500, color: "#1D1D1F", lineHeight: 1.2, marginBottom: 3 }}>{b.titulo}</h2>
                              <p style={{ fontSize: 13, color: "#6E6E73", marginBottom: 8 }}>{b.autor}{b.ano ? " · " + b.ano : ""}</p>
                            </div>
                            <div style={{ textAlign: "center", flexShrink: 0 }}>
                              <div style={{ fontFamily: "EB Garamond, serif", fontSize: 28, fontWeight: 500, color: st.color, lineHeight: 1 }}>{b.puntuacion}</div>
                              <div style={{ fontSize: 10, color: "#AEAEB2" }}>/10</div>
                            </div>
                          </div>
                          <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.6, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {b.analisis}
                          </p>
                          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                            <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 500, background: st.bg, color: st.text }}>{st.label}</span>
                            <span style={{ fontSize: 12, color: "#1D9E75", fontWeight: 500 }}>Ver analisis completo →</span>
                          </div>
                        </div>

                      </div>
                    </Link>
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