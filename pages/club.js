import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import SidebarClub from "../components/SidebarClub";
import { signInWithGoogle } from "../lib/auth";
import { supabase } from "../lib/supabase";

const RATINGS = [
  { rango: "9-10", label: "Muy afín", color: "#1D9E75", bg: "#EAF3DE", text: "#085041", desc: "Plenamente alineado con la doctrina católica. Lectura recomendada." },
  { rango: "7-8", label: "Favorable", color: "#639922", bg: "#EAF3DE", text: "#27500A", desc: "Compatible con la fe. Puede contener ideas discutibles pero sin conflicto doctrinal grave." },
  { rango: "5-6", label: "Neutral", color: "#6E6E73", bg: "#F1EFE8", text: "#444441", desc: "Sin conflictos doctrinales evidentes. Lectura válida con discernimiento." },
  { rango: "3-4", label: "Crítico", color: "#BA7517", bg: "#FAEEDA", text: "#633806", desc: "Contiene elementos problemáticos desde la perspectiva católica. Requiere criterio." },
  { rango: "1-2", label: "Contrario", color: "#A32D2D", bg: "#FCEBEB", text: "#791F1F", desc: "Incompatible con la doctrina. Puede inducir a error o promover ideas contrarias a la fe." },
];

const FAQS = [
  {
    q: "¿Quién decide la puntuación de Católicum?",
    a: "Nuestro equipo analiza cada libro basándose en fuentes públicas: el Catecismo de la Iglesia Católica, encíclicas papales y la tradición teológica. No somos una institución eclesiástica — somos católicos que ayudan a otros católicos a leer con criterio."
  },
  {
    q: "¿Es lo mismo que el Índice de libros prohibidos?",
    a: "No. Ese índice fue abolido en 1966. Nosotros no prohibimos nada — simplemente analizamos y puntuamos para que cada lector tome su propia decisión con más información."
  },
  {
    q: "¿Por qué dar una nota a un libro como Harry Potter?",
    a: "Porque muchos católicos se lo preguntan. La polémica existe, y preferimos dar una respuesta documentada a dejar el debate sin resolver. Nuestra puntuación es una opinión informada, no un dogma."
  },
  {
    q: "¿Puedo estar en desacuerdo con vuestra puntuación?",
    a: "Por supuesto — y para eso existe el sistema de valoraciones de usuario. Tu puntuación y comentario son tan válidos como el nuestro. El debate es la gracia del club."
  },
  {
    q: "¿Cómo me uno al club?",
    a: "Solo necesitas una cuenta de Google. Es gratis, sin registro de contraseña, y te permite valorar cualquier libro de nuestra base de datos."
  },
];

export default function Club() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [session, setSession] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [stats, setStats] = useState({ libros: 0, valoraciones: 0, usuarios: 0 });

  useEffect(function() {
    function checkMobile() { setIsMobile(window.innerWidth <= 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);

    supabase.auth.getSession().then(function(res) { setSession(res.data.session); });
    const { data: listener } = supabase.auth.onAuthStateChange(function(_, s) { setSession(s); });

    // Stats
    supabase.from('libros').select('id', { count: 'exact', head: true }).eq('idioma', 'es').then(function(r) {
      if (r.count) setStats(function(prev) { return Object.assign({}, prev, { libros: r.count }); });
    });
    supabase.from('valoraciones').select('id', { count: 'exact', head: true }).then(function(r) {
      if (r.count) setStats(function(prev) { return Object.assign({}, prev, { valoraciones: r.count }); });
    });

    return function() {
      window.removeEventListener("resize", checkMobile);
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F0", fontFamily: "DM Sans, sans-serif", color: "#1F2937" }}>
      <Head>
        <title>Club de Lectura Católico - Católicum</title>
        <meta name="description" content="Únete al club de lectura católico. Valora libros, debate con otros lectores y lee con criterio de fe." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* SIDEBAR */}
        {!isMobile && <SidebarClub currentPath="/club" />}

        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

          {/* MÓVIL HEADER */}
          {isMobile && (
            <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
              <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 19, fontWeight: 500, color: "#FAF7F0" }}>Católicum</span>
              </Link>
              <button onClick={function() { setMenuOpen(!menuOpen); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 5 }}>
                <span style={{ display: "block", width: 18, height: 1.5, background: "#8AAFD4", borderRadius: 1 }} />
                <span style={{ display: "block", width: 18, height: 1.5, background: "#8AAFD4", borderRadius: 1 }} />
                <span style={{ display: "block", width: 18, height: 1.5, background: "#8AAFD4", borderRadius: 1 }} />
              </button>
            </div>
          )}

          {/* HERO */}
          <div style={{ background: "#1F3A5F", padding: isMobile ? "2rem 1.25rem" : "3rem 2rem", textAlign: "center", borderBottom: "0.5px solid #2A4E7F" }}>
            <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".12em", color: "#E1B955", marginBottom: "1rem" }}>
              Tu club de lectura católico
            </p>
            <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 32 : 44, fontWeight: 400, color: "#FAF7F0", lineHeight: 1.15, marginBottom: "1rem" }}>
              Lee con criterio.<br />Lee con fe.
            </h1>
            <p style={{ fontSize: 15, color: "#8AAFD4", maxWidth: 480, margin: "0 auto 1.75rem", lineHeight: 1.6 }}>
              Más de {stats.libros || "200"} libros analizados desde la perspectiva católica. Valorados por nuestra comunidad. Debatidos con criterio.
            </p>

            {/* STATS */}
            <div style={{ display: "flex", justifyContent: "center", gap: isMobile ? 16 : 40, marginBottom: "1.75rem" }}>
              {[
                { num: stats.libros || "200+", label: "libros analizados" },
                { num: stats.valoraciones || "0", label: "valoraciones" },
                { num: "gratis", label: "sin registro previo" },
              ].map(function(s) {
                return (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 24 : 32, color: "#E1B955", lineHeight: 1 }}>{s.num}</div>
                    <div style={{ fontSize: 11, color: "#8AAFD4", marginTop: 3 }}>{s.label}</div>
                  </div>
                );
              })}
            </div>

            {!session ? (
              <button onClick={signInWithGoogle} style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "12px 28px", background: "#FAF7F0", color: "#1F3A5F",
                border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600,
                cursor: "pointer", fontFamily: "DM Sans, sans-serif"
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Unirme al club con Google
              </button>
            ) : (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "#162D4A", borderRadius: 12, border: "0.5px solid #2A4E7F" }}>
                <span style={{ fontSize: 13, color: "#8AAFD4" }}>✓ Ya eres miembro del club</span>
              </div>
            )}
          </div>

          <div style={{ maxWidth: 680, margin: "0 auto", width: "100%", padding: isMobile ? "1.5rem 1rem" : "2.5rem 1.5rem" }}>

            {/* CÓMO FUNCIONA */}
            <div style={{ marginBottom: "3rem" }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "#8AAFD4", marginBottom: "0.5rem" }}>El club</p>
              <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 26 : 32, fontWeight: 400, color: "#1F3A5F", marginBottom: "1.5rem" }}>
                Cómo funciona
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1rem" }}>
                {[
                  {
                    num: "01",
                    titulo: "Busca cualquier libro",
                    desc: "Tenemos más de 200 libros analizados — desde bestsellers polémicos hasta clásicos espirituales. Si no está el tuyo, lo añadiremos.",
                    icon: "🔍"
                  },
                  {
                    num: "02",
                    titulo: "Lee el análisis doctrinal",
                    desc: "Cada libro tiene una puntuación del 1 al 10 basada en fuentes católicas públicas: Catecismo, encíclicas y tradición teológica.",
                    icon: "📖"
                  },
                  {
                    num: "03",
                    titulo: "Añade tu valoración",
                    desc: "¿Estás de acuerdo? ¿No? Deja tu puntuación y comentario. El debate entre lectores católicos es la esencia del club.",
                    icon: "⭐"
                  },
                ].map(function(paso) {
                  return (
                    <div key={paso.num} style={{ background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 12, padding: "1.25rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <span style={{ fontSize: 22 }}>{paso.icon}</span>
                        <span style={{ fontSize: 10, fontWeight: 600, color: "#8AAFD4", letterSpacing: ".07em" }}>{paso.num}</span>
                      </div>
                      <h3 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 17, fontWeight: 400, color: "#1F3A5F", marginBottom: 6 }}>{paso.titulo}</h3>
                      <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.6 }}>{paso.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ESCALA DE PUNTUACIONES */}
            <div style={{ marginBottom: "3rem" }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "#8AAFD4", marginBottom: "0.5rem" }}>Criterio</p>
              <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 26 : 32, fontWeight: 400, color: "#1F3A5F", marginBottom: "1.5rem" }}>
                La escala de puntuación
              </h2>
              <p style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                Cada libro recibe una puntuación del 1 al 10 según su alineación con la doctrina católica. No es una condena — es una orientación para que el lector decida con más información.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {RATINGS.map(function(r) {
                  return (
                    <div key={r.rango} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px", background: r.bg, borderRadius: 10 }}>
                      <div style={{ textAlign: "center", flexShrink: 0, minWidth: 42 }}>
                        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 20, fontWeight: 500, color: r.color, lineHeight: 1 }}>{r.rango}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: r.color, marginBottom: 3 }}>{r.label}</div>
                        <div style={{ fontSize: 12, color: r.text, lineHeight: 1.5 }}>{r.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: "1rem", padding: "1rem", background: "#EDF2F8", borderRadius: 10, border: "0.5px solid #C8D4E0" }}>
                <p style={{ fontSize: 13, color: "#1F3A5F", lineHeight: 1.6 }}>
                  <strong>Importante:</strong> estas puntuaciones son análisis independientes basados en fuentes públicas. No representan la posición oficial de la Iglesia Católica. El juicio final siempre es del lector.
                </p>
              </div>
            </div>

            {/* DOS PUNTUACIONES */}
            <div style={{ marginBottom: "3rem" }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "#8AAFD4", marginBottom: "0.5rem" }}>Debate</p>
              <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 26 : 32, fontWeight: 400, color: "#1F3A5F", marginBottom: "1.5rem" }}>
                Dos puntuaciones, un debate
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                <div style={{ background: "#1F3A5F", borderRadius: 12, padding: "1.25rem" }}>
                  <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".07em", color: "#8AAFD4", marginBottom: 8 }}>Puntuación Católicum</p>
                  <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 36, color: "#E1B955", lineHeight: 1, marginBottom: 6 }}>9/10</p>
                  <p style={{ fontSize: 12, color: "#8AAFD4", lineHeight: 1.5 }}>Análisis doctrinal basado en el Catecismo y fuentes teológicas. Objetivo y documentado.</p>
                </div>
                <div style={{ background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 12, padding: "1.25rem" }}>
                  <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".07em", color: "#8AAFD4", marginBottom: 8 }}>Opinión del club</p>
                  <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 36, color: "#1F3A5F", lineHeight: 1, marginBottom: 6 }}>7.4/10</p>
                  <p style={{ fontSize: 12, color: "#6E6E73", lineHeight: 1.5 }}>La media de las valoraciones de los miembros del club. Tu voz importa.</p>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.7 }}>
                Cuando ambas puntuaciones difieren significativamente, surge el debate más rico. ¿Por qué el club valora diferente a los analistas? ¿Tiene razón la comunidad o el análisis doctrinal? Ahí está la gracia del club.
              </p>
            </div>

            {/* FAQ */}
            <div style={{ marginBottom: "3rem" }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "#8AAFD4", marginBottom: "0.5rem" }}>Preguntas frecuentes</p>
              <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 26 : 32, fontWeight: 400, color: "#1F3A5F", marginBottom: "1.5rem" }}>
                Lo que nos preguntan
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {FAQS.map(function(faq, i) {
                  const open = openFaq === i;
                  return (
                    <div key={i} style={{ background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 10, overflow: "hidden" }}>
                      <button
                        onClick={function() { setOpenFaq(open ? null : i); }}
                        style={{
                          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                          padding: "1rem 1.25rem", background: "none", border: "none", cursor: "pointer",
                          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 16, color: "#1F3A5F",
                          textAlign: "left", gap: 12
                        }}
                      >
                        <span>{faq.q}</span>
                        <span style={{ fontSize: 12, color: "#8AAFD4", flexShrink: 0 }}>{open ? "▲" : "▼"}</span>
                      </button>
                      {open && (
                        <div style={{ padding: "0 1.25rem 1rem", fontSize: 13, color: "#6E6E73", lineHeight: 1.7 }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA FINAL */}
            {!session && (
              <div style={{ background: "#1F3A5F", borderRadius: 14, padding: "2rem", textAlign: "center" }}>
                <h3 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 26, fontWeight: 400, color: "#FAF7F0", marginBottom: "0.75rem" }}>
                  ¿Listo para unirte?
                </h3>
                <p style={{ fontSize: 13, color: "#8AAFD4", marginBottom: "1.25rem", lineHeight: 1.6 }}>
                  Gratis. Sin contraseña. Solo tu cuenta de Google.
                </p>
                <button onClick={signInWithGoogle} style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "11px 24px", background: "#FAF7F0", color: "#1F3A5F",
                  border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600,
                  cursor: "pointer", fontFamily: "DM Sans, sans-serif"
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Entrar con Google
                </button>
              </div>
            )}

            <div style={{ borderTop: "0.5px solid #D8D0BC", marginTop: "2rem", paddingTop: "1rem", display: "flex", gap: 16, fontSize: 12, color: "#AEAEB2" }}>
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
