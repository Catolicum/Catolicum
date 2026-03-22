import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { searchBook, getSuggestions } from "../lib/search";
import { supabase } from "../lib/supabase";
import BarcodeScanner from "../components/BarcodeScanner";

function getScoreStyle(s) {
  if (s >= 9) return { color: "#1D9E75", bg: "#EAF3DE", text: "#085041", label: "Muy afin" };
  if (s >= 7) return { color: "#639922", bg: "#EAF3DE", text: "#27500A", label: "Favorable" };
  if (s >= 5) return { color: "#6E6E73", bg: "#F5F5F7", text: "#3A3A3C", label: "Neutral" };
  if (s >= 3) return { color: "#BA7517", bg: "#FAEEDA", text: "#633806", label: "Critico" };
  return { color: "#A32D2D", bg: "#FCEBEB", text: "#791F1F", label: "Contrario" };
}

function toSlug(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const NAV = [
  { label: "Home", href: "/" },
  { label: "Misión", href: "/mision" },
  { label: "Libros recomendados", href: "/recomendados" },
  { label: "Contacto", href: "/contacto" },
];

const POLEMIC_BOOKS = [
  { titulo: "El Codigo Da Vinci", autor: "Dan Brown", puntuacion: 1 },
  { titulo: "Harry Potter y la Piedra Filosofal", autor: "J.K. Rowling", puntuacion: 5 },
  { titulo: "Sapiens", autor: "Yuval Noah Harari", puntuacion: 2 },
  { titulo: "El Alquimista", autor: "Paulo Coelho", puntuacion: 3 },
  { titulo: "Los Pilares de la Tierra", autor: "Ken Follett", puntuacion: 4 },
  { titulo: "El Cuento de la Criada", autor: "Margaret Atwood", puntuacion: 2 },
];

const CrossIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14">
    <rect x="5.5" y="1" width="3" height="12" rx="1.5" fill="#F5F5F7"/>
    <rect x="1" y="4.5" width="12" height="3" rx="1.5" fill="#F5F5F7"/>
  </svg>
);

const BarcodeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="4" width="2" height="12" fill="#1D1D1F"/>
    <rect x="5" y="4" width="1" height="12" fill="#1D1D1F"/>
    <rect x="7" y="4" width="2" height="12" fill="#1D1D1F"/>
    <rect x="10" y="4" width="1" height="12" fill="#1D1D1F"/>
    <rect x="12" y="4" width="3" height="12" fill="#1D1D1F"/>
    <rect x="16" y="4" width="2" height="12" fill="#1D1D1F"/>
    <rect x="1" y="2" width="4" height="1" fill="#1D1D1F"/>
    <rect x="1" y="2" width="1" height="4" fill="#1D1D1F"/>
    <rect x="15" y="2" width="4" height="1" fill="#1D1D1F"/>
    <rect x="18" y="2" width="1" height="4" fill="#1D1D1F"/>
    <rect x="1" y="17" width="4" height="1" fill="#1D1D1F"/>
    <rect x="1" y="14" width="1" height="4" fill="#1D1D1F"/>
    <rect x="15" y="17" width="4" height="1" fill="#1D1D1F"/>
    <rect x="18" y="14" width="1" height="4" fill="#1D1D1F"/>
  </svg>
);

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recomendados, setRecomendados] = useState([]);
  const [totalLibros, setTotalLibros] = useState(0);

  useEffect(function() {
    function checkMobile() { setIsMobile(window.innerWidth <= 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    supabase.from('recomendados').select('titulo, autor, puntuacion, imagen_url').order('puntuacion', { ascending: false }).limit(4).then(function(res) {
      if (res.data) setRecomendados(res.data);
    });
    supabase.from('libros').select('id', { count: 'exact', head: true }).eq('idioma', 'es').then(function(res) {
      if (res.count) setTotalLibros(res.count);
    });
    return function() { window.removeEventListener("resize", checkMobile); };
  }, []);

  async function handleSearch(q) {
    var term = q.trim();
    if (!term) return;
    setLoading(true);
    setSearched(true);
    setShowSuggestions(false);
    setMenuOpen(false);
    var match = await searchBook(term);
    setResult(match);
    setLoading(false);
  }

  function handleKey(e) {
    if (e.key === "Enter") handleSearch(query);
  }

  async function handleInputChange(e) {
    var val = e.target.value;
    setQuery(val);
    if (val.length < 2) { setSuggestions([]); setShowSuggestions(false); return; }
    var results = await getSuggestions(val);
    setSuggestions(results);
    setShowSuggestions(results.length > 0);
  }

  function handleSelectSuggestion(titulo) {
    setQuery(titulo);
    setShowSuggestions(false);
    handleSearch(titulo);
  }

  function handleBarcodeDetected(isbn) {
    setShowScanner(false);
    setQuery(isbn);
    handleSearch(isbn);
  }

  var st = result ? getScoreStyle(result.s) : null;

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "DM Sans, sans-serif", color: "#1D1D1F" }}>
      <Head>
        <title>Catolicum - Analisis de libros desde la perspectiva catolica</title>
        <meta name="description" content="Descubre que hay detras de cada libro. Analisis de mas de 145 libros desde la perspectiva catolica: bestsellers polemicos, clasicos espirituales y todo lo que te preguntas antes de leer." />
        <meta name="keywords" content="analisis libros fe catolica, libros polemicos cristianismo, El Codigo Da Vinci verdad, libros recomendados catolicos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="DJgtQhrJpw86EiMeHjn-XjbOAYSsebWi-QaTPUl6dA8" />
        <meta property="og:title" content="Catolicum - Analisis de libros desde la perspectiva catolica" />
        <meta property="og:description" content="Descubre que hay detras de cada libro. Lee con criterio. Lee con fe." />
        <meta property="og:url" content="https://www.catolicum.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <link rel="canonical" href="https://www.catolicum.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ display: "flex", minHeight: "100vh", flexDirection: "row" }}>

        {!isMobile && (
          <aside style={{ width: 220, flexShrink: 0, background: "#FFFFFF", borderRight: "0.5px solid #D1D1D6", display: "flex", flexDirection: "column", padding: "1.5rem 1rem", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2rem", cursor: "pointer" }}>
                <div style={{ width: 38, height: 38, borderRadius: 9, background: "#1D1D1F", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><CrossIcon /></div>
                <div style={{ width: 1, height: 28, background: "#D1D1D6", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "EB Garamond, serif", fontSize: 19, fontWeight: 500, color: "#1D1D1F", lineHeight: 1.1 }}>Catolicum</div>
                  <div style={{ fontFamily: "EB Garamond, serif", fontSize: 11, fontStyle: "italic", color: "#6E6E73", marginTop: 2 }}>La Libreria Catolica</div>
                </div>
              </div>
            </Link>
            <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
              {NAV.map(function(item) {
                return (<Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", padding: "9px 10px", borderRadius: 8, fontSize: 14, color: "#3A3A3C", textDecoration: "none" }}>{item.label}</Link>);
              })}
            </nav>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: "1rem", borderTop: "0.5px solid #D1D1D6" }}>
              <Link href="/privacidad" style={{ fontSize: 11, color: "#AEAEB2", textDecoration: "none", padding: "3px 0" }}>Privacidad</Link>
              <Link href="/acerca" style={{ fontSize: 11, color: "#AEAEB2", textDecoration: "none", padding: "3px 0" }}>Acerca de</Link>
            </div>
          </aside>
        )}

        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

          {isMobile && (
            <div style={{ background: "#FFFFFF", borderBottom: "0.5px solid #D1D1D6", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
              <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, background: "#1D1D1F", display: "flex", alignItems: "center", justifyContent: "center" }}><CrossIcon /></div>
                <span style={{ fontFamily: "EB Garamond, serif", fontSize: 19, fontWeight: 500, color: "#1D1D1F" }}>Catolicum</span>
              </Link>
              <button onClick={function() { setMenuOpen(!menuOpen); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 5 }}>
                <span style={{ display: "block", width: 18, height: 1.5, background: "#1D1D1F", borderRadius: 1 }} />
                <span style={{ display: "block", width: 18, height: 1.5, background: "#1D1D1F", borderRadius: 1 }} />
                <span style={{ display: "block", width: 18, height: 1.5, background: "#1D1D1F", borderRadius: 1 }} />
              </button>
            </div>
          )}

          {isMobile && menuOpen && (
            <div style={{ background: "#FFFFFF", borderBottom: "0.5px solid #D1D1D6", padding: ".5rem 1rem 1rem" }}>
              {NAV.map(function(item) {
                return (<Link key={item.href} href={item.href} onClick={function() { setMenuOpen(false); }} style={{ display: "block", padding: "10px 0", fontSize: 14, color: "#1D1D1F", textDecoration: "none", borderBottom: "0.5px solid #F5F5F7" }}>{item.label}</Link>);
              })}
            </div>
          )}

          {!searched && (
            <div style={{ background: "#FFFFFF", borderBottom: "0.5px solid #D1D1D6", padding: isMobile ? "2rem 1.25rem 1.75rem" : "2.5rem 2rem 2rem", textAlign: "center" }}>
              <h1 style={{ fontFamily: "EB Garamond, serif", fontSize: isMobile ? 28 : 36, fontWeight: 500, color: "#1D1D1F", lineHeight: 1.2, marginBottom: ".6rem" }}>
                ¿Qué hay detrás de cada libro?
              </h1>
              <p style={{ fontFamily: "EB Garamond, serif", fontSize: isMobile ? 15 : 17, fontStyle: "italic", color: "#6E6E73", marginBottom: "1.5rem", borderLeft: "2px solid #D1D1D6", borderRight: "2px solid #D1D1D6", display: "inline-block", padding: "0 1rem" }}>
                Lee con criterio. Lee con fe.
              </p>
              <div style={{ position: "relative", maxWidth: 520, margin: "0 auto" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: ".75rem" }}>
                  <input
                    type="text"
                    placeholder="Busca cualquier libro..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKey}
                    onBlur={function() { setTimeout(function() { setShowSuggestions(false); }, 150); }}
                    onFocus={function() { if (suggestions.length > 0) setShowSuggestions(true); }}
                    style={{ flex: 1, height: 48, padding: "0 16px", border: "0.5px solid #D1D1D6", borderRadius: 10, background: "#F5F5F7", color: "#1D1D1F", fontSize: 14, fontFamily: "DM Sans, sans-serif", minWidth: 0 }}
                  />
                  <button onClick={function() { handleSearch(query); }} style={{ height: 48, padding: "0 22px", background: "#1D1D1F", color: "#F5F5F7", border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "DM Sans, sans-serif", whiteSpace: "nowrap", flexShrink: 0 }}>
                    Analizar
                  </button>
                  {!isMobile && (
                    <button onClick={function() { setShowScanner(true); }} title="Escanear codigo de barras" style={{ height: 48, width: 48, background: "#F5F5F7", border: "0.5px solid #D1D1D6", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <BarcodeIcon />
                    </button>
                  )}
                </div>
                {showSuggestions && (
                  <div style={{ position: "absolute", top: 52, left: 0, right: 0, background: "#FFFFFF", border: "0.5px solid #D1D1D6", borderRadius: 10, zIndex: 100, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", textAlign: "left" }}>
                    {suggestions.map(function(s) {
                      var sc = getScoreStyle(s.puntuacion);
                      return (
                        <div key={s.titulo} onMouseDown={function() { handleSelectSuggestion(s.titulo); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", borderBottom: "0.5px solid #F5F5F7" }}>
                          <span style={{ width: 28, height: 28, borderRadius: "50%", background: sc.bg, color: sc.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, flexShrink: 0 }}>{s.puntuacion}</span>
                          <span style={{ fontSize: 13, fontWeight: 500, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.titulo}</span>
                          <span style={{ fontSize: 12, color: "#6E6E73", flexShrink: 0 }}>{s.autor}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
                  {["El Codigo Da Vinci", "Harry Potter", "Sapiens", "El Alquimista"].map(function(ex) {
                    return (
                      <button key={ex} onClick={function() { setQuery(ex); handleSearch(ex); }} style={{ fontSize: 12, padding: "4px 12px", border: "0.5px solid #D1D1D6", borderRadius: 20, background: "#FFFFFF", color: "#6E6E73", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
                        {ex}
                      </button>
                    );
                  })}
                </div>
              </div>
              {isMobile && (
                <button onClick={function() { setShowScanner(true); }} style={{ width: "100%", maxWidth: 520, height: 44, background: "#F5F5F7", border: "0.5px solid #D1D1D6", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8, fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "#3A3A3C", margin: "8px auto 0" }}>
                  <BarcodeIcon />
                  Escanear codigo de barras
                </button>
              )}
            </div>
          )}

          {searched && (
            <div style={{ maxWidth: 680, margin: "0 auto", width: "100%", padding: isMobile ? "1.25rem 1rem" : "2rem 1.5rem" }}>
              <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: ".75rem" }}>
                  <input
                    type="text"
                    placeholder="Busca cualquier libro..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKey}
                    onBlur={function() { setTimeout(function() { setShowSuggestions(false); }, 150); }}
                    onFocus={function() { if (suggestions.length > 0) setShowSuggestions(true); }}
                    style={{ flex: 1, height: 48, padding: "0 16px", border: "0.5px solid #D1D1D6", borderRadius: 10, background: "#FFFFFF", color: "#1D1D1F", fontSize: 14, fontFamily: "DM Sans, sans-serif", minWidth: 0 }}
                  />
                  <button onClick={function() { handleSearch(query); }} style={{ height: 48, padding: "0 18px", background: "#1D1D1F", color: "#F5F5F7", border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "DM Sans, sans-serif", whiteSpace: "nowrap", flexShrink: 0 }}>
                    Analizar
                  </button>
                </div>
                {showSuggestions && (
                  <div style={{ position: "absolute", top: 52, left: 0, right: 0, background: "#FFFFFF", border: "0.5px solid #D1D1D6", borderRadius: 10, zIndex: 100, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                    {suggestions.map(function(s) {
                      var sc = getScoreStyle(s.puntuacion);
                      return (
                        <div key={s.titulo} onMouseDown={function() { handleSelectSuggestion(s.titulo); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", borderBottom: "0.5px solid #F5F5F7" }}>
                          <span style={{ width: 28, height: 28, borderRadius: "50%", background: sc.bg, color: sc.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, flexShrink: 0 }}>{s.puntuacion}</span>
                          <span style={{ fontSize: 13, fontWeight: 500, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.titulo}</span>
                          <span style={{ fontSize: 12, color: "#6E6E73", flexShrink: 0 }}>{s.autor}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <button onClick={function() { setSearched(false); setResult(null); setQuery(""); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: "1rem", padding: "6px 14px", background: "#FFFFFF", border: "0.5px solid #D1D1D6", borderRadius: 20, fontSize: 13, color: "#6E6E73", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
                Nueva busqueda
              </button>

              {loading && <div style={{ textAlign: "center", padding: "2rem", fontSize: 14, color: "#6E6E73" }}>Analizando...</div>}

              {!loading && result && (
                <div style={{ background: "#FFFFFF", border: "0.5px solid #D1D1D6", borderRadius: 14, overflow: "hidden" }}>
                  <div style={{ padding: "1.25rem", borderBottom: "0.5px solid #F5F5F7" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: "1rem" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Link href={"/libro/" + toSlug(result.t)} style={{ textDecoration: "none", color: "inherit" }}>
                          <h2 style={{ fontFamily: "EB Garamond, serif", fontSize: 22, fontWeight: 500, marginBottom: 4, color: "#1D1D1F" }}>{result.t}</h2>
                        </Link>
                        <p style={{ fontSize: 13, color: "#6E6E73", marginBottom: 8 }}>{result.a}{result.y ? " · " + result.y : ""}</p>
                        <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, fontWeight: 500, background: st.bg, color: st.text }}>{st.label}</span>
                      </div>
                      <div style={{ textAlign: "center", flexShrink: 0 }}>
                        <div style={{ fontFamily: "EB Garamond, serif", fontSize: 44, fontWeight: 500, lineHeight: 1, color: st.color }}>{result.s}</div>
                        <div style={{ fontSize: 12, color: "#6E6E73" }}>/10</div>
                      </div>
                    </div>
                    <div style={{ height: 4, background: "#F5F5F7", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 2, background: st.color, width: (result.s * 10) + "%" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#AEAEB2", marginTop: 4 }}>
                      <span>Contrario</span><span>Neutral</span><span>Afin</span>
                    </div>
                  </div>
                  <div style={{ padding: "1.25rem" }}>
                    <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#AEAEB2", marginBottom: 6 }}>Analisis doctrinal</p>
                    <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.7, marginBottom: "1.1rem" }}>{result.an}</p>
                    {result.tags && result.tags.length > 0 && (
                      <div style={{ marginBottom: "1.1rem" }}>
                        <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#AEAEB2", marginBottom: 6 }}>Temas presentes</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {result.tags.map(function(tag) {
                            return (<span key={tag} style={{ fontSize: 12, padding: "3px 9px", border: "0.5px solid #D1D1D6", borderRadius: 20, color: "#6E6E73" }}>{tag}</span>);
                          })}
                        </div>
                      </div>
                    )}
                    <div style={{ display: "flex", gap: 6, fontSize: 12, paddingTop: "1rem", borderTop: "0.5px solid #F5F5F7", marginBottom: ".5rem" }}>
                      <span style={{ fontWeight: 500, color: "#6E6E73", flexShrink: 0 }}>Referencia:</span>
                      <span style={{ color: "#AEAEB2" }}>{result.ref}</span>
                    </div>
                    <a href={"https://www.amazon.es/s?k=" + encodeURIComponent(result.t + " " + result.a) + "&tag=catolicum-21"} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: ".75rem", padding: "8px 16px", background: "#F5F5F7", border: "0.5px solid #D1D1D6", borderRadius: 8, fontSize: 13, color: "#3A3A3C", textDecoration: "none" }}>
                      Encontrar en Amazon
                    </a>
                  </div>
                </div>
              )}

              {!loading && !result && (
                <div style={{ background: "#FFFFFF", border: "0.5px dashed #D1D1D6", borderRadius: 14, padding: "2.5rem 1.5rem", textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>⏳</div>
                  <h3 style={{ fontFamily: "EB Garamond, serif", fontSize: 22, fontWeight: 500, marginBottom: 8, color: "#1D1D1F" }}>Libro en analisis</h3>
                  <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.6, marginBottom: 6 }}>Este libro aun no esta en nuestra base de datos. Estamos ampliando continuamente la coleccion.</p>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#3A3A3C" }}>Vuelve a intentarlo mas tarde.</p>
                </div>
              )}
            </div>
          )}

          {!searched && (
            <div>
              <div style={{ background: "#EBEBED", padding: isMobile ? "1.25rem 1rem" : "1.5rem 2rem", borderBottom: "0.5px solid #D1D1D6" }}>
                <div style={{ maxWidth: 680, margin: "0 auto" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: ".75rem" }}>
                    <p style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#6E6E73" }}>Los más buscados</p>
                    <p style={{ fontSize: 12, color: "#AEAEB2" }}>Libros populares analizados</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 8 }}>
                    {POLEMIC_BOOKS.map(function(b) {
                      var st2 = getScoreStyle(b.puntuacion);
                      return (
                        <div key={b.titulo} onClick={function() { setQuery(b.titulo); handleSearch(b.titulo); }} style={{ background: "#FFFFFF", border: "0.5px solid #D1D1D6", borderRadius: 10, padding: ".85rem", cursor: "pointer", position: "relative" }}>
                          <div style={{ position: "absolute", top: 8, right: 8, width: 26, height: 26, borderRadius: "50%", background: st2.bg, color: st2.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500 }}>{b.puntuacion}</div>
                          <p style={{ fontSize: 13, fontWeight: 500, color: "#1D1D1F", lineHeight: 1.3, marginBottom: 3, paddingRight: 30 }}>{b.titulo}</p>
                          <p style={{ fontSize: 11, color: "#6E6E73" }}>{b.autor}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div style={{ background: "#FFFFFF", padding: isMobile ? "1.25rem 1rem" : "1.5rem 2rem", borderBottom: "0.5px solid #D1D1D6" }}>
                <div style={{ maxWidth: 680, margin: "0 auto" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: ".75rem" }}>
                    <p style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#6E6E73" }}>Para el lector catolico</p>
                    <Link href="/recomendados" style={{ fontSize: 12, color: "#1D9E75", textDecoration: "none" }}>Ver todos →</Link>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
                    {recomendados.map(function(b) {
                      var rs = getScoreStyle(b.puntuacion);
                      var slug = toSlug(b.titulo);
                      return (
                        <Link key={b.titulo} href={"/recomendados/" + slug} style={{ textDecoration: "none", color: "inherit" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#F5F5F7", border: "0.5px solid #D1D1D6", borderRadius: 10, padding: ".75rem 1rem" }}>
                            {b.imagen_url ? (
                              <img src={b.imagen_url} alt={b.titulo} style={{ width: 36, height: 50, borderRadius: 4, objectFit: "cover", flexShrink: 0 }} />
                            ) : (
                              <div style={{ width: 36, height: 50, borderRadius: 4, background: "#1D1D1F", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><CrossIcon /></div>
                            )}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "#1D1D1F" }}>{b.titulo}</div>
                              <div style={{ fontSize: 12, color: "#6E6E73" }}>{b.autor}</div>
                            </div>
                            <div style={{ width: 30, height: 30, borderRadius: "50%", background: rs.bg, color: rs.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, flexShrink: 0 }}>{b.puntuacion}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div style={{ background: "#EBEBED", padding: isMobile ? "1.25rem 1rem" : "1.5rem 2rem", borderBottom: "0.5px solid #D1D1D6" }}>
                <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", justifyContent: "space-around", textAlign: "center" }}>
                  <div>
                    <div style={{ fontFamily: "EB Garamond, serif", fontSize: 28, fontWeight: 500, color: "#1D1D1F" }}>{totalLibros || "200+"}</div>
                    <div style={{ fontSize: 12, color: "#6E6E73", marginTop: 2 }}>libros analizados</div>
                  </div>
                  <div style={{ width: 1, background: "#D1D1D6" }} />
                  <div>
                    <div style={{ fontFamily: "EB Garamond, serif", fontSize: 28, fontWeight: 500, color: "#1D9E75" }}>gratis</div>
                    <div style={{ fontSize: 12, color: "#6E6E73", marginTop: 2 }}>sin registro</div>
                  </div>
                  <div style={{ width: 1, background: "#D1D1D6" }} />
                  <div>
                    <div style={{ fontFamily: "EB Garamond, serif", fontSize: 28, fontWeight: 500, color: "#1D1D1F" }}>1-10</div>
                    <div style={{ fontSize: 12, color: "#6E6E73", marginTop: 2 }}>escala de afinidad</div>
                  </div>
                </div>
              </div>

            </div>
          )}

          <footer style={{ background: "#FFFFFF", borderTop: "0.5px solid #D1D1D6", padding: "1.5rem" }}>
            <p style={{ fontSize: 11, color: "#AEAEB2", lineHeight: 1.65, textAlign: "center", marginBottom: 8 }}>
              Proyecto independiente, no afiliado a la Iglesia Catolica ni a ninguna institucion religiosa oficial.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, fontSize: 12 }}>
              <Link href="/acerca" style={{ color: "#AEAEB2", textDecoration: "none" }}>Acerca de</Link>
              <span style={{ color: "#D1D1D6" }}>·</span>
              <Link href="/privacidad" style={{ color: "#AEAEB2", textDecoration: "none" }}>Privacidad</Link>
              <span style={{ color: "#D1D1D6" }}>·</span>
              <Link href="/contacto" style={{ color: "#AEAEB2", textDecoration: "none" }}>Contacto</Link>
            </div>
          </footer>

        </div>
      </div>

      {showScanner && (
        <BarcodeScanner
          onDetected={handleBarcodeDetected}
          onClose={function() { setShowScanner(false); }}
        />
      )}

    </div>
  );
}