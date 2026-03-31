import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getBookBySlug, getAllSlugs } from "../../lib/search";
import Valoracion from "../../components/Valoracion";
import MobileHeader from "../../components/MobileHeader";
import SidebarClub from "../../components/SidebarClub";

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

function getScoreLabel(s) {
  if (s >= 9) return "plenamente alineado con la doctrina católica";
  if (s >= 7) return "favorable desde la perspectiva católica";
  if (s >= 5) return "neutral, sin conflictos doctrinales graves";
  if (s >= 3) return "crítico, con elementos problemáticos para la fe católica";
  return "contrario a la doctrina católica";
}

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
  var scoreLabel = getScoreLabel(book.s);
  var canonicalUrl = "https://catolicum.com/libro/" + slug;

  var metaTitle = book.t + " de " + book.a + " — Análisis católico y puntuación | Católicum";
  var metaDesc = "¿Es " + book.t + " compatible con la fe católica? Puntuación " + book.s + "/10 — " + scoreLabel + ". Análisis doctrinal completo basado en el Catecismo y fuentes teológicas.";
  var metaKeywords = book.t + ", " + book.a + ", libro católico, análisis católico, compatible fe católica, " + (book.tags ? book.tags.join(", ") : "");

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F0", fontFamily: "DM Sans, sans-serif", color: "#1F2937", overflowX: "clip" }}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_ES" />
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

        {!isMobile && <SidebarClub currentPath="" />}

        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

          {isMobile && <MobileHeader currentPath="" />}

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
                    <div style={{ fontSize: 10, color: "#8AAFD4", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>Católicum</div>
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

            {/* SECCIÓN SEO — texto con keywords naturales */}
            <div style={{ marginTop: "2rem", background: "#EDF2F8", borderRadius: 12, padding: "1.25rem", border: "0.5px solid #C8D4E0" }}>
              <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 18, fontWeight: 400, color: "#1F3A5F", marginBottom: ".75rem" }}>
                ¿Es "{book.t}" un libro recomendable para católicos?
              </h2>
              <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.7, marginBottom: ".75rem" }}>
                Según el análisis doctrinal de Católicum, <strong>{book.t}</strong> de <strong>{book.a}</strong> recibe una puntuación de <strong>{book.s} sobre 10</strong> desde la perspectiva de la fe católica. Esto lo sitúa como un libro <strong>{scoreLabel}</strong>.
              </p>
              <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.7, marginBottom: ".75rem" }}>
                Nuestro análisis se basa en el Catecismo de la Iglesia Católica, encíclicas papales y la tradición teológica. No pretende ser una posición oficial de la Iglesia, sino una orientación para lectores católicos que quieren leer con criterio de fe.
              </p>
              <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.7 }}>
                ¿No estás de acuerdo con nuestra puntuación? Únete al club de lectura católico y deja tu propia valoración. El debate enriquece.
              </p>
              <Link href="/" style={{ display: "inline-block", marginTop: ".75rem", fontSize: 13, color: "#1F3A5F", fontWeight: 500, textDecoration: "none" }}>
                → Analizar otro libro
              </Link>
            </div>

            <div style={{ marginTop: "1.5rem", borderTop: "0.5px solid #D8D0BC", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#AEAEB2" }}>
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
