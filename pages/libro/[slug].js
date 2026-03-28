import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getBookBySlug, getAllSlugs } from "../../lib/search";
import Valoracion from "../../components/Valoracion";

function getScoreStyle(s) {
  if (s >= 9) return { color: "#1D9E75", bg: "#EAF3DE", text: "#085041", label: "Muy afin" };
  if (s >= 7) return { color: "#639922", bg: "#EAF3DE", text: "#27500A", label: "Favorable" };
  if (s >= 5) return { color: "#888780", bg: "#F1EFE8", text: "#444441", label: "Neutral" };
  if (s >= 3) return { color: "#BA7517", bg: "#FAEEDA", text: "#633806", label: "Critico" };
  return { color: "#A32D2D", bg: "#FCEBEB", text: "#791F1F", label: "Contrario" };
}

function toSlug(str) {
  if (!str) return "";
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

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

const NAV = [
  { label: "Home", href: "/" },
  { label: "Misión", href: "/mision" },
  { label: "Libros recomendados", href: "/recomendados" },
  { label: "Contacto", href: "/contacto" },
];

export async function getStaticPaths() {
  try {
    var slugs = await getAllSlugs();
    var paths = (slugs || []).filter(Boolean).map(function(slug) {
      return { params: { slug: slug } };
    });
    return { paths: paths, fallback: false };
  } catch(e) {
    return { paths: [], fallback: false };
  }
}

export async function getStaticProps(context) {
  try {
    var slug = context.params.slug;
    var book = await getBookBySlug(slug);
    if (!book) return { notFound: true };
    return { props: { book: book } };
  } catch(e) {
    return { notFound: true };
  }
}

export default function LibroPage(props) {
  var book = props.book;
  var [isMobile, setIsMobile] = useState(false);
  var [menuOpen, setMenuOpen] = useState(false);

  useEffect(function() {
    function checkMobile() { setIsMobile(window.innerWidth <= 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return function() { window.removeEventListener("resize", checkMobile); };
  }, []);

  var st = getScoreStyle(book.s);
  var amazonUrl = "https://www.amazon.es/s?k=" + encodeURIComponent(book.t + " " + book.a) + "&tag=catolicum-21";
  var slug = toSlug(book.t);
  var barWidth = (book.s * 10) + "%";
  var metaDesc = book.t + " de " + book.a + " — Puntuación " + book.s + "/10. Análisis completo desde la perspectiva católica.";
  var canonicalUrl = "https://www.catolicum.com/libro/" + slug;

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F0", fontFamily: "DM Sans, sans-serif", color: "#1F2937" }}>
      <Head>
        <title>{book.t} — ¿Deberías leerlo? Análisis y puntuación - Católicum</title>
        <meta name="description" content={metaDesc} />
        <meta name="keywords" content={book.t + ", " + book.a + ", analisis catolico, fe catolica"} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={book.t + " - Analisis catolico - Católicum"} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Book",
              "name": book.t,
              "author": { "@type": "Person", "name": book.a },
              "datePublished": book.y ? String(book.y) : undefined,
              "description": book.an,
              "inLanguage": "es",
              "url": canonicalUrl,
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": String(book.s),
                "bestRating": "10",
                "worstRating": "1",
                "ratingCount": "1",
                "reviewCount": "1"
              },
              "review": {
                "@type": "Review",
                "reviewRating": { "@type": "Rating", "ratingValue": String(book.s), "bestRating": "10", "worstRating": "1" },
                "author": { "@type": "Organization", "name": "Católicum" },
                "reviewBody": book.an
              }
            })
          }}
        />
      </Head>

      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* SIDEBAR */}
        {!isMobile && (
          <aside style={{ width: 220, flexShrink: 0, background: "#1F3A5F", borderRight: "0.5px solid #2A4E7F", display: "flex", flexDirection: "column", padding: "1.5rem 1rem", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "2rem", cursor: "pointer" }}>
                <LogoIcon size={36} />
                <div style={{ width: 1, height: 28, background: "#2A4E7F", flexShrink: 0 }} />
                <svg width="120" height="26" viewBox="0 0 220 48" style={{ display: "block" }}>
                  <text x="0" y="38" fontFamily="'EB Garamond', Georgia, serif" fontSize="36" fill="#FAF7F0" fontWeight="400" letterSpacing="1">Ca</text>
                  <rect x="67" y="8" width="4" height="32" rx="2" fill="#E1B955" />
                  <rect x="57" y="16" width="22" height="4" rx="2" fill="#E1B955" />
                  <text x="83" y="38" fontFamily="'EB Garamond', Georgia, serif" fontSize="36" fill="#FAF7F0" fontWeight="400" letterSpacing="1">olicum</text>
                </svg>
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

          {/* CONTENIDO */}
          <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "1.25rem 1rem" : "2rem 1.5rem", width: "100%" }}>

            <Link href="/" style={{ fontSize: 13, color: "#8AAFD4", textDecoration: "none" }}>← Volver</Link>

            <div style={{ marginTop: "1.5rem", background: "#FFFFFF", border: "0.5px solid #C8D4E0", borderRadius: 14, overflow: "hidden" }}>

              <div style={{ padding: "1.25rem", borderBottom: "0.5px solid #EDF2F8" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: "1rem" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 22 : 26, fontWeight: 400, marginBottom: 4, color: "#1F3A5F", lineHeight: 1.2 }}>
                      {book.t}
                    </h1>
                    <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, fontStyle: "italic", color: "#8AAFD4", marginBottom: 8 }}>
                      ¿Deberías leerlo? — Análisis y puntuación
                    </p>
                    <p style={{ fontSize: 13, color: "#6E6E73", marginBottom: 8 }}>
                      {book.a}{book.y ? " · " + book.y : ""}
                    </p>
                    <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, fontWeight: 500, background: st.bg, color: st.text }}>
                      {st.label}
                    </span>
                  </div>
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 48, fontWeight: 400, lineHeight: 1, color: st.color }}>{book.s}</div>
                    <div style={{ fontSize: 12, color: "#6E6E73" }}>/10</div>
                  </div>
                </div>
                <div style={{ height: 4, background: "#EDF2F8", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 2, background: st.color, width: barWidth }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#AEAEB2", marginTop: 4 }}>
                  <span>Contrario</span><span>Neutral</span><span>Afin</span>
                </div>
              </div>

              <div style={{ padding: "1.25rem" }}>
                <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#8AAFD4", marginBottom: 6 }}>Análisis doctrinal</p>
                <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.7, marginBottom: "1.25rem" }}>{book.an}</p>

                {book.tags && book.tags.length > 0 && (
                  <div style={{ marginBottom: "1.25rem" }}>
                    <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#8AAFD4", marginBottom: 6 }}>Temas presentes</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {book.tags.map(function(tag) {
                        return (<span key={tag} style={{ fontSize: 12, padding: "3px 9px", border: "0.5px solid #C8D4E0", borderRadius: 20, color: "#5C6B99" }}>{tag}</span>);
                      })}
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", gap: 6, fontSize: 12, paddingTop: "1rem", borderTop: "0.5px solid #EDF2F8", marginBottom: "1rem" }}>
                  <span style={{ fontWeight: 500, color: "#6E6E73", flexShrink: 0 }}>Referencia:</span>
                  <span style={{ color: "#AEAEB2" }}>{book.ref}</span>
                </div>

                <a href={amazonUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 16px", background: "#EEE8D8", border: "0.5px solid #D8D0BC", borderRadius: 8, fontSize: 13, color: "#1F3A5F", textDecoration: "none" }}>
                  Encontrar en Amazon
                </a>
              </div>
            </div>

            {/* VALORACIONES */}
            <Valoracion libroSlug={slug} />

            <div style={{ marginTop: "2rem", borderTop: "0.5px solid #D8D0BC", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#AEAEB2" }}>
              <Link href="/" style={{ color: "#AEAEB2", textDecoration: "none" }}>Inicio</Link>
              <span style={{ color: "#D8D0BC" }}>·</span>
              <Link href="/recomendados" style={{ color: "#AEAEB2", textDecoration: "none" }}>Recomendados</Link>
              <span style={{ color: "#D8D0BC" }}>·</span>
              <Link href="/privacidad" style={{ color: "#AEAEB2", textDecoration: "none" }}>Privacidad</Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}