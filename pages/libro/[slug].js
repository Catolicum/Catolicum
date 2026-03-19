import Head from "next/head";
import Link from "next/link";
import { BOOKS } from "../../lib/books";

function getScoreStyle(s) {
  if (s >= 9) return { color: "#1D9E75", bg: "#EAF3DE", text: "#085041", label: "Muy afin" };
  if (s >= 7) return { color: "#639922", bg: "#EAF3DE", text: "#27500A", label: "Favorable" };
  if (s >= 5) return { color: "#888780", bg: "#F1EFE8", text: "#444441", label: "Neutral" };
  if (s >= 3) return { color: "#BA7517", bg: "#FAEEDA", text: "#633806", label: "Critico" };
  return { color: "#A32D2D", bg: "#FCEBEB", text: "#791F1F", label: "Contrario" };
}

function toSlug(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getStaticPaths() {
  const paths = BOOKS.filter(function(b) {
    return b.l === "es";
  }).map(function(b) {
    return { params: { slug: toSlug(b.t) } };
  });
  return { paths: paths, fallback: false };
}

export async function getStaticProps(context) {
  var slug = context.params.slug;
  var book = BOOKS.find(function(b) {
    return b.l === "es" && toSlug(b.t) === slug;
  });
  if (!book) return { notFound: true };
  return { props: { book: book } };
}

export default function LibroPage(props) {
  var book = props.book;
  var st = getScoreStyle(book.s);
  var amazonUrl = "https://www.amazon.es/s?k=" + encodeURIComponent(book.t + " " + book.a) + "&tag=catolicum-21";
  var slug = toSlug(book.t);
  var barWidth = (book.s * 10) + "%";
  var metaDesc = book.an.slice(0, 140);
  var canonicalUrl = "https://catolicum.vercel.app/libro/" + slug;
  var ogTitle = book.t + " - Analisis catolico - Catolicum";
  var pageTitle = book.t + " - Analisis catolico - Catolicum";
  var keywords = book.t + ", " + book.a + ", analisis catolico, fe catolica";

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={canonicalUrl} />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "2rem 1rem", fontFamily: "DM Sans, sans-serif", color: "#2C2C2A" }}>

        <Link href="/" style={{ fontSize: 13, color: "#888780", textDecoration: "none" }}>
          Volver a Catolicum
        </Link>

        <div style={{ marginTop: "1.5rem", background: "#fff", border: "0.5px solid #D3D1C7", borderRadius: 14, overflow: "hidden" }}>

          <div style={{ padding: "1.25rem", borderBottom: "0.5px solid #F1EFE8" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: "1rem" }}>
              <div style={{ flex: 1 }}>
                <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: 26, fontWeight: 500, marginBottom: 4 }}>
                  {book.t}
                </h1>
                <p style={{ fontSize: 13, color: "#888780", marginBottom: 8 }}>
                  {book.a}{book.y ? " · " + book.y : ""}
                </p>
                <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, fontWeight: 500, background: st.bg, color: st.text }}>
                  {st.label}
                </span>
              </div>
              <div style={{ textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontFamily: "EB Garamond, serif", fontSize: 48, fontWeight: 500, lineHeight: 1, color: st.color }}>
                  {book.s}
                </div>
                <div style={{ fontSize: 12, color: "#888780" }}>/10</div>
              </div>
            </div>

            <div style={{ height: 5, background: "#F1EFE8", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 3, background: st.color, width: barWidth }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#B4B2A9", marginTop: 4 }}>
              <span>Contrario</span>
              <span>Neutral</span>
              <span>Afin</span>
            </div>

          </div>

          <div style={{ padding: "1.25rem" }}>

            <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#B4B2A9", marginBottom: 6 }}>
              Analisis doctrinal
            </p>
            <p style={{ fontSize: 14, color: "#5F5E5A", lineHeight: 1.65, marginBottom: "1.25rem" }}>
              {book.an}
            </p>

            <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#B4B2A9", marginBottom: 6 }}>
              Temas presentes
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: "1.25rem" }}>
              {book.tags.map(function(tag) {
                return (
                  <span key={tag} style={{ fontSize: 12, padding: "3px 9px", border: "0.5px solid #D3D1C7", borderRadius: 20, color: "#888780" }}>
                    {tag}
                  </span>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: 6, fontSize: 12, paddingTop: "1rem", borderTop: "0.5px solid #F1EFE8", marginBottom: "1rem" }}>
              <span style={{ fontWeight: 500, color: "#888780" }}>Referencia:</span>
              <span style={{ color: "#B4B2A9" }}>{book.ref}</span>
            </div>

            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 16px", background: "#FAF8F4", border: "0.5px solid #D3D1C7", borderRadius: 8, fontSize: 13, color: "#5F5E5A", textDecoration: "none" }}
            >
              Encontrar en Amazon
            </a>

          </div>
        </div>

        <div style={{ marginTop: "2rem", borderTop: "0.5px solid #D3D1C7", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#B4B2A9" }}>
          <Link href="/" style={{ color: "#B4B2A9", textDecoration: "none" }}>Inicio</Link>
          <span>.</span>
          <Link href="/recomendados" style={{ color: "#B4B2A9", textDecoration: "none" }}>Recomendados</Link>
          <span>.</span>
          <Link href="/privacidad" style={{ color: "#B4B2A9", textDecoration: "none" }}>Privacidad</Link>
        </div>

      </div>
    </div>
  );
}