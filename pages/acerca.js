import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import SidebarClub from "../components/SidebarClub";
import MobileHeader from "../components/MobileHeader";

export default function Acerca() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(function() {
    function checkMobile() { setIsMobile(window.innerWidth <= 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return function() { window.removeEventListener("resize", checkMobile); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F0", fontFamily: "DM Sans, sans-serif", color: "#1F2937", overflowX: "hidden" }}>
      <Head>
        <title>Acerca de - Católicum</title>
        <meta name="description" content="Sobre Católicum, el club de lectura católico digital." />
        <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ display: "flex", minHeight: "100vh", maxWidth: "100vw", overflow: "hidden" }}>
        {!isMobile && <SidebarClub currentPath="/acerca" />}
        <div style={{ flex: 1, minWidth: 0, maxWidth: "100%", display: "flex", flexDirection: "column" }}>
          {isMobile && <MobileHeader currentPath="/acerca" />}
          <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: isMobile ? "1.25rem 1.25rem 1rem" : "1.5rem 2rem 1.25rem", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 24 : 30, fontWeight: 400, color: "#FAF7F0", lineHeight: 1.2, marginBottom: ".4rem" }}>Acerca de Católicum</h1>
            <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 14 : 15, fontStyle: "italic", color: "#E1B955", display: "inline-block", padding: "0 1rem", borderLeft: "2px solid #2A4E7F", borderRight: "2px solid #2A4E7F" }}>El club de lectura católico</p>
          </div>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "1.25rem 1rem" : "2.5rem 1.5rem", width: "100%" }}>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "#3A3A3C", marginBottom: "1.5rem" }}>Católicum es una herramienta independiente pensada para ayudar a lectores católicos a conocer si un libro es compatible con la fe antes de leerlo. Y un club para debatirlo.</p>
            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 24, fontWeight: 400, margin: "2rem 0 .75rem", color: "#1F3A5F" }}>Qué es Católicum</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "1rem" }}>Una base de datos de libros analizados desde la perspectiva de la doctrina católica. Cada libro recibe una puntuación del 1 al 10 según su alineación con la fe, junto con un análisis detallado y referencias a fuentes públicas. Los miembros del club pueden añadir su propia valoración y comentario.</p>
            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 24, fontWeight: 400, margin: "2rem 0 .75rem", color: "#1F3A5F" }}>Quién lo hace</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "1rem" }}>Católicum es un proyecto independiente creado por un católico para la comunidad católica. No está afiliado a la Iglesia Católica ni a ninguna institución religiosa oficial.</p>
            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 24, fontWeight: 400, margin: "2rem 0 .75rem", color: "#1F3A5F" }}>Escala de puntuación</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "2rem" }}>
              {[
                { rango: "9-10", label: "Muy afín", color: "#1D9E75", bg: "#EAF3DE", desc: "Plenamente alineado con la doctrina" },
                { rango: "7-8", label: "Favorable", color: "#639922", bg: "#EAF3DE", desc: "Compatible y recomendable" },
                { rango: "5-6", label: "Neutral", color: "#6E6E73", bg: "#F5F5F7", desc: "Sin conflictos doctrinales" },
                { rango: "3-4", label: "Crítico", color: "#BA7517", bg: "#FAEEDA", desc: "Elementos problemáticos" },
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
            <div style={{ borderTop: "0.5px solid #D8D0BC", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#AEAEB2" }}>
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
