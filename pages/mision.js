import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import SidebarClub from "../components/SidebarClub";

export default function Mision() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(function() {
    function checkMobile() { setIsMobile(window.innerWidth <= 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return function() { window.removeEventListener("resize", checkMobile); };
  }, []);

  const NAV_MOBILE = [
    { label: "Home", href: "/" },
    { label: "Club de lectura", href: "/club" },
    { label: "Libros recomendados", href: "/recomendados" },
    { label: "Misión", href: "/mision" },
    { label: "Contacto", href: "/contacto" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F0", fontFamily: "DM Sans, sans-serif", color: "#1F2937" }}>
      <Head>
        <title>Nuestra Misión - Católicum</title>
        <meta name="description" content="La misión de Católicum: ayudar a lectores católicos a elegir libros compatibles con su fe." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {!isMobile && <SidebarClub currentPath="/mision" />}

        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

          {isMobile && (
            <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
              <Link href="/" style={{ textDecoration: "none" }}>
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
              {NAV_MOBILE.map(function(item) {
                return (<Link key={item.href} href={item.href} onClick={function() { setMenuOpen(false); }} style={{ display: "block", padding: "10px 0", fontSize: 14, fontFamily: "'EB Garamond', Georgia, serif", color: "#8AAFD4", textDecoration: "none", borderBottom: "0.5px solid #2A4E7F" }}>{item.label}</Link>);
              })}
            </div>
          )}

          {/* HERO COMPACTO */}
          <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: isMobile ? "1.25rem 1.25rem 1rem" : "1.5rem 2rem 1.25rem", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 24 : 30, fontWeight: 400, color: "#FAF7F0", lineHeight: 1.2, marginBottom: ".4rem" }}>
              Nuestra Misión
            </h1>
            <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 14 : 15, fontStyle: "italic", color: "#E1B955", display: "inline-block", padding: "0 1rem", borderLeft: "2px solid #2A4E7F", borderRight: "2px solid #2A4E7F" }}>
              Lee con criterio. Lee con fe.
            </p>
          </div>

          <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "1.25rem 1rem" : "2.5rem 1.5rem", width: "100%" }}>

            <p style={{ fontSize: 15, lineHeight: 1.75, color: "#3A3A3C", marginBottom: "1.5rem" }}>
              Católicum nació de una necesidad real: ayudar a los católicos a navegar el mundo editorial con criterio de fe. Cada año se publican miles de libros, y no siempre es fácil saber cuáles son compatibles con la doctrina católica.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "#3A3A3C", marginBottom: "1.5rem" }}>
              Nuestra misión es sencilla: ofrecer un análisis honesto, documentado y accesible de los libros más leídos, desde la perspectiva de la fe católica. No para prohibir ni condenar, sino para orientar.
            </p>

            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 24, fontWeight: 400, margin: "2rem 0 .75rem", color: "#1F3A5F" }}>Lo que nos guía</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "1rem" }}>
              Cada análisis se basa en fuentes públicas: el Catecismo de la Iglesia Católica, encíclicas papales, documentos del Concilio Vaticano II y la tradición teológica. No somos una institución eclesiástica ni hablamos en nombre de la Iglesia. Somos católicos que quieren ayudar a otros católicos.
            </p>

            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 24, fontWeight: 400, margin: "2rem 0 .75rem", color: "#1F3A5F" }}>El club de lectura</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "1rem" }}>
              Más allá del análisis, Católicum es un lugar de debate. Cada miembro puede valorar los libros con su propia puntuación y comentario. Cuando la comunidad difiere del análisis doctrinal, surge el debate más enriquecedor.
            </p>

            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 24, fontWeight: 400, margin: "2rem 0 .75rem", color: "#1F3A5F" }}>Un proyecto independiente</h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C", marginBottom: "2rem" }}>
              Católicum es un proyecto independiente y gratuito. Se financia mediante publicidad no intrusiva y enlaces de afiliado a librerías online. Toda la información que ofrecemos se basa en fuentes públicas y el juicio final siempre corresponde al lector.
            </p>

            <div style={{ borderTop: "0.5px solid #D8D0BC", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#AEAEB2" }}>
              <Link href="/club" style={{ color: "#AEAEB2", textDecoration: "none" }}>Club de lectura</Link>
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