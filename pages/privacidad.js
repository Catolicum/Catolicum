import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import SidebarClub from "../components/SidebarClub";
import MobileHeader from "../components/MobileHeader";

export default function Privacidad() {
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
        <title>Política de Privacidad - Católicum</title>
        <meta name="description" content="Política de privacidad de Católicum." />
        <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ display: "flex", minHeight: "100vh", maxWidth: "100vw", overflow: "hidden" }}>
        {!isMobile && <SidebarClub currentPath="/privacidad" />}
        <div style={{ flex: 1, minWidth: 0, maxWidth: "100%", display: "flex", flexDirection: "column" }}>
          {isMobile && <MobileHeader currentPath="/privacidad" />}
          <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: isMobile ? "1.25rem 1.25rem 1rem" : "1.5rem 2rem 1.25rem", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 24 : 30, fontWeight: 400, color: "#FAF7F0", lineHeight: 1.2, marginBottom: ".4rem" }}>Política de Privacidad</h1>
            <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 14 : 15, fontStyle: "italic", color: "#E1B955", display: "inline-block", padding: "0 1rem", borderLeft: "2px solid #2A4E7F", borderRight: "2px solid #2A4E7F" }}>Última actualización: enero 2025</p>
          </div>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "1.25rem 1rem" : "2.5rem 1.5rem", width: "100%" }}>
            {[
              { t: "1. Quiénes somos", c: "Católicum es un proyecto independiente que ofrece análisis doctrinales de libros desde la perspectiva católica, basados en fuentes públicas. No está afiliado a la Iglesia Católica ni a ninguna institución religiosa oficial." },
              { t: "2. Datos que recopilamos", c: "Cuando te unes al club con Google, recopilamos tu nombre, dirección de email y foto de perfil de tu cuenta de Google. También guardamos las valoraciones y comentarios que dejes en los libros." },
              { t: "3. Cómo usamos tus datos", c: "Usamos tus datos para identificarte como miembro del club, mostrar tu nombre y avatar junto a tus valoraciones, y permitirte editar o eliminar tus propias valoraciones." },
              { t: "4. Cookies y publicidad", c: "Esta web utiliza Google AdSense para mostrar publicidad. Google puede usar cookies para personalizar los anuncios si el usuario ha dado su consentimiento. Puedes consultar la política de Google en policies.google.com/privacy." },
              { t: "5. Servicios de terceros", c: "La web está alojada en Vercel y usa Supabase para la base de datos y autenticación. Ambos servicios pueden registrar datos técnicos de acceso con fines de seguridad y rendimiento." },
              { t: "6. Cambios en esta política", c: "Nos reservamos el derecho a actualizar esta política. Los cambios se publicarán en esta misma página." },
            ].map(function(s) {
              return (
                <div key={s.t} style={{ marginBottom: "1.5rem" }}>
                  <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 20, fontWeight: 400, color: "#1F3A5F", marginBottom: ".5rem" }}>{s.t}</h2>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "#3A3A3C" }}>{s.c}</p>
                </div>
              );
            })}
            <div style={{ borderTop: "0.5px solid #D8D0BC", paddingTop: "1rem", fontSize: 12, color: "#AEAEB2" }}>Católicum — Proyecto independiente, no afiliado a la Iglesia Católica.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
