import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getBookBySlug, getAllSlugs } from "../../lib/search";

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

export async function getStaticPaths() {
  try {
    var slugs = await getAllSlugs();
    var paths = (slugs || []).filter(Boolean).map(function(slug) {
      return { params: { slug: slug } };
    });
    return { paths: paths, fallback: false };
  } catch(e) {
    console.log('Error en getStaticPaths:', e);
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
  var metaDesc = book.t + " de " + book.a + " — Puntuación " + book.s + "/10. Análisis completo: qué hay detrás de este libro y todo lo que debes saber antes de leerlo.";
  var canonicalUrl = "https://www.catolicum.com/libro/" + slug;

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "DM Sans, sans-serif", color: "#1D1D1F" }}>
      <Head>
        <title>{book.t} — ¿Deberías leerlo? Análisis y puntuación - Catolicum</title>
        <meta name="description" content={metaDesc} />
        <meta name="keywords" content={book.t + ", " + book.a + ", analisis catolico, fe catolica"} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={book.t + " - Analisis catolico - Catolicum"} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={canonicalUrl} />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
        <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Book",
                  "name": book.t,
                  "author": {
                    "@type": "Person",
                    "name": book.a
                  },
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
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": String(book.s),
                      "bestRating": "10",
                      "worstRating": "1"
                    },
                    "author": {
                      "@type": "Organization",
                      "name": "Catolicum"
                    },
                    "reviewBody": book.an
                  }
                })
              }}
            />
      </Head>

      {isMobile && (
        <div style={{ background: "#FFFFFF", borderBottom: "0.5px solid #D1D1D6", padding: "10px 16px", display: "flex", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, background: "#1D1D1F", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14">
                <rect x="5.5" y="1" width="3" height="12" rx="1.5" fill="#F5F5F7"/>
                <rect x="1" y="4.5" width="12" height="3" rx="1.5" fill="#F5F5F7"/>
              </svg>
            </div>
            <span style={{ fontFamily: "EB Garamond, serif", fontSize: 19, fontWeight: 500, color: "#1D1D1F" }}>Catolicum</span>
          </Link>
        </div>
      )}

      <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "1.25rem 1rem" : "2rem 1.5rem" }}>

        <Link href="/" style={{ fontSize: 13, color: "#6E6E73", textDecoration: "none" }}>← Volver</Link>

        <div style={{ marginTop: "1.5rem", background: "#FFFFFF", border: "0.5px solid #D1D1D6", borderRadius: 14, overflow: "hidden" }}>

          <div style={{ padding: "1.25rem", borderBottom: "0.5px solid #F5F5F7" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: "1rem" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: isMobile ? 22 : 26, fontWeight: 500, marginBottom: 4, color: "#1D1D1F", lineHeight: 1.2 }}>
                  {book.t}
                </h1>
                <p style={{ fontFamily: "EB Garamond, serif", fontSize: 15, fontStyle: "italic", color: "#6E6E73", marginBottom: 8 }}>
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
                <div style={{ fontFamily: "EB Garamond, serif", fontSize: 48, fontWeight: 500, lineHeight: 1, color: st.color }}>{book.s}</div>
                <div style={{ fontSize: 12, color: "#6E6E73" }}>/10</div>
              </div>
            </div>
            <div style={{ height: 4, background: "#F5F5F7", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 2, background: st.color, width: barWidth }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#AEAEB2", marginTop: 4 }}>
              <span>Contrario</span><span>Neutral</span><span>Afin</span>
            </div>
          </div>

          <div style={{ padding: "1.25rem" }}>
            <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#AEAEB2", marginBottom: 6 }}>Analisis doctrinal</p>
            <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.7, marginBottom: "1.25rem" }}>{book.an}</p>

            {book.tags && book.tags.length > 0 && (
              <div style={{ marginBottom: "1.25rem" }}>
                <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#AEAEB2", marginBottom: 6 }}>Temas presentes</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {book.tags.map(function(tag) {
                    return (<span key={tag} style={{ fontSize: 12, padding: "3px 9px", border: "0.5px solid #D1D1D6", borderRadius: 20, color: "#6E6E73" }}>{tag}</span>);
                  })}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 6, fontSize: 12, paddingTop: "1rem", borderTop: "0.5px solid #F5F5F7", marginBottom: "1rem" }}>
              <span style={{ fontWeight: 500, color: "#6E6E73", flexShrink: 0 }}>Referencia:</span>
              <span style={{ color: "#AEAEB2" }}>{book.ref}</span>
            </div>

            <a href={amazonUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 16px", background: "#F5F5F7", border: "0.5px solid #D1D1D6", borderRadius: 8, fontSize: 13, color: "#3A3A3C", textDecoration: "none" }}>
              Encontrar en Amazon
            </a>
          </div>
        </div>

        <div style={{ marginTop: "2rem", borderTop: "0.5px solid #D1D1D6", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#AEAEB2" }}>
          <Link href="/" style={{ color: "#AEAEB2", textDecoration: "none" }}>Inicio</Link>
          <span>·</span>
          <Link href="/recomendados" style={{ color: "#AEAEB2", textDecoration: "none" }}>Recomendados</Link>
          <span>·</span>
          <Link href="/privacidad" style={{ color: "#AEAEB2", textDecoration: "none" }}>Privacidad</Link>
        </div>

      </div>
    </div>
  );
}