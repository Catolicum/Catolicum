import Head from "next/head";
import Link from "next/link";

export default function Acerca() {
  return (
    <>
      <Head>
        <title>Acerca de — Catolicum</title>
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "2rem 1rem", fontFamily: "'DM Sans', sans-serif", color: "#2C2C2A" }}>
        <Link href="/" style={{ fontSize: 13, color: "#888780", textDecoration: "none" }}>← Volver a Catolicum</Link>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 32, fontWeight: 500, margin: "1.5rem 0 .5rem" }}>Acerca de Catolicum</h1>

        <p style={{ fontSize: 15, lineHeight: 1.75, color: "#5F5E5A", marginBottom: "1.5rem", marginTop: "1.5rem" }}>
          Catolicum es una herramienta independiente pensada para ayudar a lectores católicos a conocer si un libro es compatible con la fe católica antes de leerlo.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 500, margin: "1.5rem 0 .5rem" }}>¿Qué es Catolicum?</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5F5E5A", marginBottom: "1rem" }}>
          Una base de datos de libros analizados desde la perspectiva de la doctrina católica. Cada libro recibe una puntuación del 1 al 10 según su alineación con la fe, junto con un análisis detallado y referencias a fuentes públicas como el Catecismo, encíclicas papales y documentos del Magisterio.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 500, margin: "1.5rem 0 .5rem" }}>¿Quién lo hace?</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5F5E5A", marginBottom: "1rem" }}>
          Catolicum es un proyecto independiente creado por un católico para la comunidad católica. No está afiliado a la Iglesia Católica, al Vaticano, ni a ninguna institución religiosa oficial. Las valoraciones son de carácter orientativo y se basan en fuentes públicas.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 500, margin: "1.5rem 0 .5rem" }}>¿Cómo se analiza cada libro?</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5F5E5A", marginBottom: "1rem" }}>
          Cada análisis se basa en fuentes públicas: el Catecismo de la Iglesia Católica, encíclicas papales, documentos del Concilio Vaticano II y declaraciones de teólogos reconocidos. La puntuación refleja el grado de compatibilidad del contenido del libro con la doctrina católica tradicional.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 500, margin: "1.5rem 0 .5rem" }}>Escala de puntuación</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
          {[
            { rango: "9 – 10", label: "Muy afín", color: "#1D9E75", bg: "#EAF3DE", desc: "Plenamente alineado con la doctrina católica" },
            { rango: "7 – 8", label: "Favorable", color: "#639922", bg: "#EAF3DE", desc: "Compatible con la fe, recomendable para católicos" },
            { rango: "5 – 6", label: "Neutral", color: "#888780", bg: "#F1EFE8", desc: "Sin conflictos doctrinales significativos" },
            { rango: "3 – 4", label: "Crítico", color: "#BA7517", bg: "#FAEEDA", desc: "Contiene elementos problemáticos para la fe" },
            { rango: "1 – 2", label: "Contrario", color: "#A32D2D", bg: "#FCEBEB", desc: "Incompatible o directamente contrario a la doctrina" },
          ].map((item) => (
            <div key={item.rango} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", background: item.bg, borderRadius: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 500, minWidth: 40, color: item.color }}>{item.rango}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: item.color, minWidth: 80 }}>{item.label}</span>
              <span style={{ fontSize: 13, color: item.color }}>{item.desc}</span>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 500, margin: "1.5rem 0 .5rem" }}>Aviso importante</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5F5E5A", marginBottom: "2rem" }}>
          Las valoraciones de Catolicum son orientativas y no representan la posición oficial de la Iglesia Católica. El juicio final sobre la conveniencia de leer un libro siempre corresponde al lector, idealmente en diálogo con su director espiritual o párroco.
        </p>

        <div style={{ borderTop: "0.5px solid #D3D1C7", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#B4B2A9" }}>
          <Link href="/privacidad" style={{ color: "#B4B2A9", textDecoration: "none" }}>Política de Privacidad</Link>
          <span>·</span>
          <span>Catolicum — Proyecto independiente</span>
        </div>
      </div>
    </>
  );
}