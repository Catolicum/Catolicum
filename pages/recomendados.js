import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import SidebarClub from "../components/SidebarClub";
import MobileHeader from "../components/MobileHeader";

function toSlug(str) {
  if (!str) return "";
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getScoreStyle(s) {
  if (s >= 9) return { color: "#1D9E75", bg: "#EAF3DE", text: "#085041" };
  if (s >= 7) return { color: "#639922", bg: "#EAF3DE", text: "#27500A" };
  return { color: "#6E6E73", bg: "#F5F5F7", text: "#3A3A3C" };
}

export default function Recomendados() {
  const [isMobile, setIsMobile] = useState(false);
  const [lista, setLista] = useState([]);

  useEffect(function() {
    function checkMobile() { setIsMobile(window.innerWidth <= 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    supabase.from('recomendados').select('*').order('puntuacion', { ascending: false }).then(function(res) {
      if (res.data) setLista(res.data);
    });
    return function() { window.removeEventListener("resize", checkMobile); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F0", fontFamily: "DM Sans, sans-serif", color: "#1F2937", overflowX: "clip" }}>
      <Head>
        <title>Libros Recomendados - Católicum</title>
        <meta name="description" content="Los mejores libros para lectores católicos. Selección del club de lectura católico." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {!isMobile && <SidebarClub currentPath="/recomendados" />}

        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          {isMobile && <MobileHeader currentPath="/recomendados" />}

          <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: isMobile ? "1.25rem 1.25rem 1rem" : "1.5rem 2rem 1.25rem", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 24 : 30, fontWeight: 400, color: "#FAF7F0", lineHeight: 1.2, marginBottom: ".4rem" }}>Libros recomendados</h1>
            <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 14 : 15, fontStyle: "italic", color: "#E1B955", marginBottom: ".65rem", borderLeft: "2px solid #2A4E7F", borderRight: "2px solid #2A4E7F", display: "inline-block", padding: "0 1rem" }}>Selección del club de lectura católico</p>
            <div style={{ borderTop: "0.5px solid #2A4E7F", borderBottom: "0.5px solid #2A4E7F", padding: ".3rem 0", maxWidth: 340, margin: "0 auto" }}>
              <span style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "#8AAFD4" }}>Compatible o plenamente alineados con la fe católica</span>
            </div>
          </div>

          <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "1.25rem 1rem" : "2rem 1.5rem", width: "100%" }}>
            {lista.length === 0 && <p style={{ fontSize: 13, color: "#8AAFD4" }}>Cargando...</p>}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {lista.map(function(b) {
                var slug = toSlug(b.titulo);
                var st = getScoreStyle(b.puntuacion);
                var amazonUrl = "https://www.amazon.es/s?k=" + encodeURIComponent(b.titulo + " " + b.autor) + "&tag=catolicum-21";
                return (
                  <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 10, padding: "0.75rem 1rem" }}>
                    <Link href={"/recomendados/" + slug} style={{ textDecoration: "none", flexShrink: 0 }}>
                      {b.imagen_url ? (
                        <img src={b.imagen_url} alt={b.titulo} style={{ width: 36, height: 50, borderRadius: 4, objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: 36, height: 50, borderRadius: 4, background: "#EDF2F8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="14" height="14" viewBox="0 0 14 14"><rect x="5.5" y="1" width="3" height="12" rx="1.5" fill="#2A4E7F"/><rect x="1" y="4.5" width="12" height="3" rx="1.5" fill="#2A4E7F"/></svg>
                        </div>
                      )}
                    </Link>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link href={"/recomendados/" + slug} style={{ textDecoration: "none" }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "#1F3A5F", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.titulo}</div>
                      </Link>
                      <div style={{ fontSize: 12, color: "#6E6E73" }}>{b.autor}</div>
                    </div>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: st.bg, color: st.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, flexShrink: 0 }}>{b.puntuacion}</div>
                    <a href={amazonUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, padding: "5px 10px", border: "0.5px solid #D8D0BC", borderRadius: 6, color: "#1F3A5F", textDecoration: "none", flexShrink: 0, background: "#EEE8D8" }}>Amazon</a>
                  </div>
                );
              })}
            </div>
            <div style={{ borderTop: "0.5px solid #D8D0BC", marginTop: "2rem", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#AEAEB2" }}>
              <Link href="/privacidad" style={{ color: "#AEAEB2", textDecoration: "none" }}>Política de Privacidad</Link>
              <span style={{ color: "#D8D0BC" }}>·</span>
              <Link href="/contacto" style={{ color: "#AEAEB2", textDecoration: "none" }}>Contacto</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
