import Head from "next/head";
import Link from "next/link";
import { BOOKS } from "../lib/books";

function getScoreStyle(s) {
  if (s >= 9) return { color: "#1D9E75", bg: "#EAF3DE", text: "#085041" };
  if (s >= 7) return { color: "#639922", bg: "#EAF3DE", text: "#27500A" };
  return { color: "#888780", bg: "#F1EFE8", text: "#444441" };
}

export default function Recomendados() {
  const lista = BOOKS.filter(function(b) { return b.s >= 7; }).sort(function(a, b) { return b.s - a.s; });

  return (
    <div>
      <Head>
        <title>Libros Recomendados - Catolicum</title>
        <meta name="description" content="Los mejores libros para lectores catolicos." />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "2rem 1rem", fontFamily: "DM Sans, sans-serif", color: "#2C2C2A" }}>

        <Link href="/" style={{ fontSize: 13, color: "#888780", textDecoration: "none" }}>
          Volver a Catolicum
        </Link>

        <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: 36, fontWeight: 500, margin: "1.5rem 0 .5rem" }}>
          Libros recomendados
        </h1>

        <p style={{ fontSize: 14, color: "#888780", marginBottom: "2rem", lineHeight: 1.6 }}>
          Seleccion de libros compatibles o plenamente alineados con la fe catolica.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {lista.map(function(b) {
            var st = getScoreStyle(b.s);
            var url = "https://www.amazon.es/s?k=" + encodeURIComponent(b.t + " " + b.a) + "&tag=catolicum-21";
            return (
              <div
                key={b.t + b.l}
                style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "0.5px solid #D3D1C7", borderRadius: 10, padding: "0.75rem 1rem" }}
              >
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: st.bg, color: st.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 500, flexShrink: 0 }}>
                  {b.s}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{b.t}</div>
                  <div style={{ fontSize: 12, color: "#888780" }}>{b.a}</div>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 12, padding: "5px 10px", border: "0.5px solid #D3D1C7", borderRadius: 6, color: "#5F5E5A", textDecoration: "none", flexShrink: 0 }}
                >
                  Amazon
                </a>
              </div>
            );
          })}
        </div>

        <div style={{ borderTop: "0.5px solid #D3D1C7", marginTop: "2rem", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#B4B2A9" }}>
          <Link href="/privacidad" style={{ color: "#B4B2A9", textDecoration: "none" }}>
            Politica de Privacidad
          </Link>
          <span style={{ color: "#D3D1C7" }}>·</span>
          <Link href="/contacto" style={{ color: "#B4B2A9", textDecoration: "none" }}>
            Contacto
          </Link>
        </div>

      </div>
    </div>
  );
}