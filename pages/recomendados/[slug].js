import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getRecomendadoBySlug, getRecomendadosRicos } from "../../lib/search";
import Valoracion from "../../components/Valoracion";

function toSlug(str) {
  if (!str) return "";
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getScoreStyle(s) {
  if (s >= 9) return { color: "#1D9E75", bg: "#EAF3DE", text: "#085041", label: "Muy afin" };
  if (s >= 7) return { color: "#639922", bg: "#EAF3DE", text: "#27500A", label: "Favorable" };
  return { color: "#6E6E73", bg: "#F5F5F7", text: "#3A3A3C", label: "Neutral" };
}

const NAV = [
  { label: "Home", href: "/" },
  { label: "Mision", href: "/mision" },
  { label: "Libros recomendados", href: "/recomendados" },
  { label: "Contacto", href: "/contacto" },
];

function LogoIcon({ size = 36 }) {
  var rx = Math.round(size * 0.22);
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

export async function getStaticPaths() {
  var libros = await getRecomendadosRicos();
  var paths = libros
    .filter(function(b) { return b.titulo; })
    .map(function(b) {
      return { params: { slug: toSlug(b.titulo) } };
    });
  return { paths: paths, fallback: false };
}

export async function getStaticProps(context) {
  var libro = await getRecomendadoBySlug(context.params.slug);
  if (!libro) return { notFound: true };
  return { props: { libro: libro } };
}

export default function RecomendadoPage({ libro }) {
  var [menuOpen, setMenuOpen] = useState(false);
  var [isMobile, setIsMobile] = useState(false);
  var [coverUrl, setCoverUrl] = useState(null);
  var st = getScoreStyle(libro.puntuacion);
  var slug = toSlug(libro.titulo);
  var similares = libro.libros_similares ? libro.libros_similares.split("|") : [];

  useEffect(function() {
    function checkMobile() { setIsMobile(window.innerWidth <= 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    if (libro.imagen_url) {
      setCoverUrl(libro.imagen_url);
    } else {
      var query = encodeURIComponent(libro.titulo + " " + libro.autor);
      fetch("https://openlibrary.org/search.json?q=" + query + "&limit=1&fields=cover_i,title")
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (data.docs && data.docs[0] && data.docs[0].cover_i) {
            var coverId = data.docs[0].cover_i;
            setCoverUrl("https://covers.openlibrary.org/b/id/" + coverId + "-L.jpg");
          }
        })
        .catch(function() {});
    }
    return function() { window.removeEventListener("resize", checkMobile); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F0", fontFamily: "DM Sans, sans-serif", color: "#1F2937" }}>
      <Head>
        <title>{libro.titulo} - Recomendado para católicos - Católicum</title>
        <meta name="description" content={libro.titulo + " de " + libro.autor + ". " + (libro.analisis || "").slice(0, 140)} />
        <meta name="keywords" content={libro.titulo + ", " + libro.autor + ", libro católico recomendado, " + (libro.tags || "")} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={libro.titulo + " - Recomendado - Católicum"} />
        <meta property="og:description" content={(libro.analisis || "").slice(0, 150)} />
        <meta property="og:url" content={"https://www.catolicum.com/recomendados/" + slug} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={"https://www.catolicum.com/recomendados/" + slug} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* SIDEBAR */}
        {!isMobile && (
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
                return (<Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", padding: "9px 10px", borderRadius: 8, fontSize: 14, fontFamily: "'EB Garamond', Georgia, serif", color: "#8AAFD4", textDecoration: "none" }}>{item.label}</Link>);
              })}
            </nav>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: "1rem", borderTop: "0.5px solid #2A4E7F" }}>
              <Link href="/privacidad" style={{ fontSize: 11, color: "#3A5A7A", textDecoration: "none", padding: "3px 0" }}>Privacidad</Link>
              <Link href="/acerca" style={{ fontSize: 11, color: "#3A5A7A", textDecoration: "none", padding: "3px 0" }}>Acerca de</Link>
            </div>
          </aside>
        )}

        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

          {/* MÓVIL HEADER */}
          {isMobile && (
            <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
              <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
                <LogoIcon size={28} />
                <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 19, fontWeight: 500, color: "#FAF7F0" }}>Católicum</span>
              </Link>
              <button onClick={function() { setMenuOpen(!menuOpen); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 5 }}>
                <span style={{ display: "block", width: 18, height: 1.5, background: "#8AAFD4", borderRadius: 1 }} />
                <span style={{ display: "block", width: 18, height: 1.5, background: "#8AAFD4", borderRadius: 1 }} />
                <span style={{ display: "block", width: 18, height: 1.5, background: "#8AAFD4", borderRadius: 1 }} />
              </button>
            </div>
          )}

          {isMobile && menuOpen && (
            <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: ".5rem 1rem 1rem" }}>
              {NAV.map(function(item) {
                return (<Link key={item.href} href={item.href} onClick={function() { setMenuOpen(false); }} style={{ display: "block", padding: "10px 0", fontSize: 14, fontFamily: "'EB Garamond', Georgia, serif", color: "#8AAFD4", textDecoration: "none", borderBottom: "0.5px solid #2A4E7F" }}>{item.label}</Link>);
              })}
            </div>
          )}

          <div style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "1.25rem 1rem" : "2.5rem 1.5rem", width: "100%" }}>

            <Link href="/recomendados" style={{ fontSize: 13, color: "#8AAFD4", textDecoration: "none" }}>← Libros recomendados</Link>

            {/* CABECERA */}
            <div style={{ display: "flex", gap: 24, marginTop: "1.5rem", marginBottom: "2rem", alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }}>
              <div style={{ flexShrink: 0 }}>
                {coverUrl ? (
                  <img src={coverUrl} alt={"Portada de " + libro.titulo} style={{ width: isMobile ? 120 : 140, borderRadius: 8, boxShadow: "0 4px 20px rgba(31,58,95,0.15)", display: "block" }} />
                ) : (
                  <div style={{ width: isMobile ? 120 : 140, height: isMobile ? 180 : 210, borderRadius: 8, background: "#EDF2F8", border: "0.5px solid #C8D4E0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <LogoIcon size={36} />
                  </div>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#8AAFD4" }}>{libro.categoria}</span>
                <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 26 : 32, fontWeight: 400, color: "#1F3A5F", margin: "6px 0 4px", lineHeight: 1.2 }}>{libro.titulo}</h1>
                <p style={{ fontSize: 14, color: "#6E6E73", marginBottom: 12 }}>{libro.autor}{libro.ano ? " · " + libro.ano : ""}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 40, fontWeight: 400, color: st.color, lineHeight: 1 }}>{libro.puntuacion}</div>
                  <div>
                    <div style={{ fontSize: 11, color: "#AEAEB2" }}>/10</div>
                    <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, fontWeight: 500, background: st.bg, color: st.text }}>{st.label}</span>
                  </div>
                </div>
                <div style={{ height: 4, background: "#EDF2F8", borderRadius: 2, overflow: "hidden", marginBottom: 16 }}>
                  <div style={{ height: "100%", borderRadius: 2, background: st.color, width: (libro.puntuacion * 10) + "%" }} />
                </div>
                {libro.amazon_url && (
                  <a href={libro.amazon_url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "#1F3A5F", color: "#FAF7F0", borderRadius: 10, fontSize: 14, textDecoration: "none", fontFamily: "DM Sans, sans-serif" }}>
                    Comprar en Amazon
                  </a>
                )}
              </div>
            </div>

            {/* SECCIONES */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              <div style={{ background: "#FFFFFF", border: "0.5px solid #C8D4E0", borderRadius: 12, padding: "1.25rem" }}>
                <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#8AAFD4", marginBottom: 8 }}>Analisis doctrinal</p>
                <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.75 }}>{libro.analisis}</p>
              </div>

              {libro.para_quien && (
                <div style={{ background: "#FFFFFF", border: "0.5px solid #C8D4E0", borderRadius: 12, padding: "1.25rem" }}>
                  <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#8AAFD4", marginBottom: 8 }}>Para quien es este libro</p>
                  <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.75 }}>{libro.para_quien}</p>
                </div>
              )}

              {libro.momentos_vida && (
                <div style={{ background: "#EAF3DE", border: "0.5px solid #9FE1CB", borderRadius: 12, padding: "1.25rem" }}>
                  <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#085041", marginBottom: 8 }}>Cuando puede ayudarte</p>
                  <p style={{ fontSize: 14, color: "#085041", lineHeight: 1.75 }}>{libro.momentos_vida}</p>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>
                {libro.puntos_fuertes && (
                  <div style={{ background: "#FFFFFF", border: "0.5px solid #C8D4E0", borderRadius: 12, padding: "1.25rem" }}>
                    <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#1D9E75", marginBottom: 8 }}>Puntos fuertes</p>
                    <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.75 }}>{libro.puntos_fuertes}</p>
                  </div>
                )}
                {libro.puntos_debiles && (
                  <div style={{ background: "#FFFFFF", border: "0.5px solid #C8D4E0", borderRadius: 12, padding: "1.25rem" }}>
                    <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#BA7517", marginBottom: 8 }}>A tener en cuenta</p>
                    <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.75 }}>{libro.puntos_debiles}</p>
                  </div>
                )}
              </div>

              {similares.length > 0 && (
                <div style={{ background: "#FFFFFF", border: "0.5px solid #C8D4E0", borderRadius: 12, padding: "1.25rem" }}>
                  <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#8AAFD4", marginBottom: 12 }}>Libros similares que pueden gustarte</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {similares.map(function(s) {
                      return (
                        <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "0.5px solid #EDF2F8" }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#8AAFD4", flexShrink: 0 }} />
                          <span style={{ fontSize: 14, color: "#3A3A3C" }}>{s.trim()}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {libro.amazon_url && (
                <div style={{ background: "#1F3A5F", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
                  <p style={{ fontSize: 14, color: "#8AAFD4", marginBottom: 12 }}>Encuentra este libro en Amazon</p>
                  <a href={libro.amazon_url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "#E1B955", color: "#1F3A5F", borderRadius: 10, fontSize: 15, textDecoration: "none", fontFamily: "DM Sans, sans-serif", fontWeight: 500 }}>
                    Comprar en Amazon
                  </a>
                  <p style={{ fontSize: 11, color: "#3A5A7A", marginTop: 8 }}>Enlace de afiliado · Católicum recibe una pequeña comisión sin coste para ti</p>
                </div>
              )}

              {/* VALORACIONES */}
              <Valoracion libroSlug={slug} />

            </div>

            <div style={{ borderTop: "0.5px solid #D8D0BC", marginTop: "2rem", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#AEAEB2" }}>
              <Link href="/recomendados" style={{ color: "#AEAEB2", textDecoration: "none" }}>Recomendados</Link>
              <span style={{ color: "#D8D0BC" }}>·</span>
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