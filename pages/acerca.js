import Head from "next/head";
import Link from "next/link";

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

export default function Acerca() {
  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "DM Sans, sans-serif", color: "#1D1D1F" }}>
      <Head>
        <title>Acerca de - Catolicum</title>
        <meta name="description" content="Sobre Catolicum, la libreria catolica digital de analisis doctrinal de libros." />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ display: "flex", minHeight: "100vh" }}>

        <aside style={{ width: 220, flexShrink: 0, background: "#FFFFFF", borderRight: "0.5px solid #D1D1D6", display: "flex", flexDirection: "column", padding: "1.5rem 1rem", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2rem", cursor: "pointer" }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: "#1D1D1F", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CrossIcon />
              </div>
              <div style={{ width: 1, height: 28, background: "#D1D1D6", flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "EB Garamond, serif", fontSize: 19, fontWeight: 500, color: "#1D1D1F", lineHeight: 1.1 }}>Catolicum</div>
                <div style={{ fontFamily: "EB Garamond, serif", fontSize: 11, fontStyle: "italic", color: "#6E6E73", marginTop: 2 }}>La Libreria Catolica</div>
              </div>
            </div>
          </Link>
          <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
            {NAV.map(function(item) {
              return (
                <Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", padding: "9px 10px", borderRadius: 8, fontSize: 14, color: "#3A3A3C", textDecoration: "none" }}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: "1rem", borderTop: "0.5px solid #D1D1D6" }}>
            <Link href="/privacidad" style={{ fontSize: 11, color: "#AEAEB2", textDecoration: "none", padding: "3px 0" }}>Privacidad</Link>
            <Link href="/acerca" style={{ fontSize: 11, color: "#AEAEB2", textDecoration: "none", padding: "3px 0" }}>Acerca de</Link>
          </div>
        </aside>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
            <Link href="/" style={{ fontSize: 13, color: "#6E6E73", textDecoration: "none" }}>← Volver</Link>
            <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: 36, fontWeight: 500, margin: "1.5rem 0 1rem", color: "#1D1D1F" }}>Acerca de Catolicum</h1>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "#3A3A3C", marginBottom: "1.5rem" }}>
              Catolicum es una herramienta independiente pensada para ayudar a lectores catolicos a conocer si un libro es compatible con la fe antes de leerlo.
            </p>
            <h2 style={{ fontFamily: "EB Garamond, serif", fontSize: 24, fontWeight: 500, margin: "2rem 0 .75rem", color: "#1D1D1F" }}>Que es Catolicum</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "1rem" }}>
              Una base de datos de libros analizados desde la perspectiva de la doctrina catolica. Cada libro recibe una puntuacion del 1 al 10 segun su alineacion con la fe, junto con un analisis detallado y referencias a fuentes publicas como el Catecismo, enciclicas papales y documentos del Magisterio.
            </p>
            <h2 style={{ fontFamily: "EB Garamond, serif", fontSize: 24, fontWeight: 500, margin: "2rem 0 .75rem", color: "#1D1D1F" }}>Quien lo hace</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "1rem" }}>
              Catolicum es un proyecto independiente creado por un catolico para la comunidad catolica. No esta afiliado a la Iglesia Catolica, al Vaticano, ni a ninguna institucion religiosa oficial. Las valoraciones son de caracter orientativo y se basan en fuentes publicas.
            </p>
            <h2 style={{ fontFamily: "EB Garamond, serif", fontSize: 24, fontWeight: 500, margin: "2rem 0 .75rem", color: "#1D1D1F" }}>Escala de puntuacion</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "2rem" }}>
              {[
                { rango: "9-10", label: "Muy afin", color: "#1D9E75", bg: "#EAF3DE", desc: "Plenamente alineado con la doctrina" },
                { rango: "7-8", label: "Favorable", color: "#639922", bg: "#EAF3DE", desc: "Compatible y recomendable" },
                { rango: "5-6", label: "Neutral", color: "#6E6E73", bg: "#F5F5F7", desc: "Sin conflictos doctrinales" },
                { rango: "3-4", label: "Critico", color: "#BA7517", bg: "#FAEEDA", desc: "Elementos problematicos" },
                { rango: "1-2", label: "Contrario", color: "#A32D2D", bg: "#FCEBEB", desc: "Incompatible con la doctrina" },
              ].map(function(item) {
                return (
                  <div key={item.rango} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", background: item.bg, borderRadius: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, minWidth: 40, color: item.color }}>{item.rango}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: item.color, minWidth: 80 }}>{item.label}</span>
                    <span style={{ fontSize: 13, color: item.color }}>{item.desc}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ borderTop: "0.5px solid #D1D1D6", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#AEAEB2" }}>
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