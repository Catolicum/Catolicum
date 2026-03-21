import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getRecomendadoBySlug, getRecomendadosRicos } from "../../lib/search";

function toSlug(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getScoreStyle(s) {
  if (s >= 9) return { color: "#1D9E75", bg: "#EAF3DE", text: "#085041", label: "Muy afin" };
  if (s >= 7) return { color: "#639922", bg: "#EAF3DE", text: "#27500A", label: "Favorable" };
  return { color: "#6E6E73", bg: "#F5F5F7", text: "#3A3A3C", label: "Neutral" };
}

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

export async function getStaticPaths() {
  var libros = await getRecomendadosRicos();
  var paths = libros.map(function(b) {
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

  useEffect(function() {function checkMobile() { setIsMobile(window.innerWidth <= 768); }
  checkMobile();
  window.addEventListener("resize", checkMobile);
  if (libro.imagen_url) setCoverUrl(libro.imagen_url);
  return function() { window.removeEventListener("resize", checkMobile); }

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

    return function() { window.removeEventListener("resize", checkMobile); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "DM Sans, sans-serif", color: "#1D1D1F" }}>
      <Head>
        <title>{libro.titulo} - Recomendado para catolicos - Catolicum</title>
        <meta name="description" content={libro.titulo + " de " + libro.autor + ". " + (libro.analisis || "").slice(0, 140)} />
        <meta name="keywords" content={libro.titulo + ", " + libro.autor + ", libro catolico recomendado, " + (libro.tags || "")} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={libro.titulo + " - Recomendado - Catolicum"} />
        <meta property="og:description" content={(libro.analisis || "").slice(0, 150)} />
        <meta property="og:url" content={"https://catolicum.vercel.app/recomendados/" + slug} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={"https://catolicum.vercel.app/recomendados/" + slug} />
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

            <Link href="/recomendados" style={{ fontSize: 13, color: "#6E6E73", textDecoration: "none" }}>← Libros recomendados</Link>

            <div style={{ display: "flex", gap: 24, marginTop: "1.5rem", marginBottom: "2rem", alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }}>

              <div style={{ flexShrink: 0 }}>
                {coverUrl ? (
                  <img src={coverUrl} alt={"Portada de " + libro.titulo} style={{ width: isMobile ? 120 : 140, borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", display: "block" }} />
                ) : (
                  <div style={{ width: isMobile ? 120 : 140, height: isMobile ? 180 : 210, borderRadius: 8, background: "#FFFFFF", border: "0.5px solid #D1D1D6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 9, background: "#1D1D1F", display: "flex", alignItems: "center", justifyContent: "center" }}><CrossIcon /></div>
                  </div>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#AEAEB2" }}>{libro.categoria}</span>
                <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: isMobile ? 26 : 32, fontWeight: 500, color: "#1D1D1F", margin: "6px 0 4px", lineHeight: 1.2 }}>{libro.titulo}</h1>
                <p style={{ fontSize: 14, color: "#6E6E73", marginBottom: 12 }}>{libro.autor}{libro.ano ? " · " + libro.ano : ""}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ fontFamily: "EB Garamond, serif", fontSize: 40, fontWeight: 500, color: st.color, lineHeight: 1 }}>{libro.puntuacion}</div>
                  <div>
                    <div style={{ fontSize: 11, color: "#AEAEB2" }}>/10</div>
                    <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, fontWeight: 500, background: st.bg, color: st.text }}>{st.label}</span>
                  </div>
                </div>
                <div style={{ height: 4, background: "#F5F5F7", borderRadius: 2, overflow: "hidden", marginBottom: 16 }}>
                  <div style={{ height: "100%", borderRadius: 2, background: st.color, width: (libro.puntuacion * 10) + "%" }} />
                </div>
                {libro.amazon_url && (
                  <a href={libro.amazon_url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "#1D1D1F", color: "#F5F5F7", borderRadius: 10, fontSize: 14, textDecoration: "none", fontFamily: "DM Sans, sans-serif" }}>
                    Comprar en Amazon
                  </a>
                )}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              <div style={{ background: "#FFFFFF", border: "0.5px solid #D1D1D6", borderRadius: 12, padding: "1.25rem" }}>
                <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#AEAEB2", marginBottom: 8 }}>Analisis doctrinal</p>
                <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.75 }}>{libro.analisis}</p>
              </div>

              {libro.para_quien && (
                <div style={{ background: "#FFFFFF", border: "0.5px solid #D1D1D6", borderRadius: 12, padding: "1.25rem" }}>
                  <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#AEAEB2", marginBottom: 8 }}>Para quien es este libro</p>
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
                  <div style={{ background: "#FFFFFF", border: "0.5px solid #D1D1D6", borderRadius: 12, padding: "1.25rem" }}>
                    <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#1D9E75", marginBottom: 8 }}>Puntos fuertes</p>
                    <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.75 }}>{libro.puntos_fuertes}</p>
                  </div>
                )}
                {libro.puntos_debiles && (
                  <div style={{ background: "#FFFFFF", border: "0.5px solid #D1D1D6", borderRadius: 12, padding: "1.25rem" }}>
                    <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#BA7517", marginBottom: 8 }}>A tener en cuenta</p>
                    <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.75 }}>{libro.puntos_debiles}</p>
                  </div>
                )}
              </div>

              {similares.length > 0 && (
                <div style={{ background: "#FFFFFF", border: "0.5px solid #D1D1D6", borderRadius: 12, padding: "1.25rem" }}>
                  <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#AEAEB2", marginBottom: 12 }}>Libros similares que pueden gustarte</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {similares.map(function(s) {
                      var parts = s.split(" de ");
                      var titulo = parts[0] ? parts[0].trim() : s.trim();
                      return (
                        <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "0.5px solid #F5F5F7" }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D1D1D6", flexShrink: 0 }} />
                          <span style={{ fontSize: 14, color: "#3A3A3C" }}>{s.trim()}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {libro.amazon_url && (
                <div style={{ background: "#1D1D1F", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
                  <p style={{ fontSize: 14, color: "#AEAEB2", marginBottom: 12 }}>Encuentra este libro en Amazon</p>
                  <a href={libro.amazon_url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "#F5F5F7", color: "#1D1D1F", borderRadius: 10, fontSize: 15, textDecoration: "none", fontFamily: "DM Sans, sans-serif", fontWeight: 500 }}>
                    Comprar en Amazon
                  </a>
                  <p style={{ fontSize: 11, color: "#6E6E73", marginTop: 8 }}>Enlace de afiliado - Catolicum recibe una pequeña comision sin coste para ti</p>
                </div>
              )}

            </div>

            <div style={{ borderTop: "0.5px solid #D1D1D6", marginTop: "2rem", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#AEAEB2" }}>
              <Link href="/recomendados" style={{ color: "#AEAEB2", textDecoration: "none" }}>Recomendados</Link>
              <span>·</span>
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