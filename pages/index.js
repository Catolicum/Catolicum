import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { searchBook, getSuggestions } from "../lib/search";
import { supabase } from "../lib/supabase";
import BarcodeScanner from "../components/BarcodeScanner";
import Valoracion from "../components/Valoracion";
import SidebarClub from "../components/SidebarClub";
import HeartButton from "../components/HeartButton";
import WishlistPanel from "../components/WishlistPanel";
import { signInWithGoogle } from "../lib/auth";

function getScoreStyle(s) {
  if (s >= 9) return { color: "#1D9E75", bg: "#EAF3DE", text: "#085041", label: "Muy afin" };
  if (s >= 7) return { color: "#639922", bg: "#EAF3DE", text: "#27500A", label: "Favorable" };
  if (s >= 5) return { color: "#6E6E73", bg: "#F5F5F7", text: "#3A3A3C", label: "Neutral" };
  if (s >= 3) return { color: "#BA7517", bg: "#FAEEDA", text: "#633806", label: "Critico" };
  return { color: "#A32D2D", bg: "#FCEBEB", text: "#791F1F", label: "Contrario" };
}

function toSlug(str) {
  if (!str) return "";
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const POLEMIC_BOOKS = [
  { titulo: "El Codigo Da Vinci", autor: "Dan Brown", puntuacion: 1 },
  { titulo: "Harry Potter y la Piedra Filosofal", autor: "J.K. Rowling", puntuacion: 5 },
  { titulo: "Sapiens", autor: "Yuval Noah Harari", puntuacion: 2 },
  { titulo: "El Alquimista", autor: "Paulo Coelho", puntuacion: 3 },
  { titulo: "Los Pilares de la Tierra", autor: "Ken Follett", puntuacion: 4 },
  { titulo: "El Cuento de la Criada", autor: "Margaret Atwood", puntuacion: 2 },
];

const BarcodeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="4" width="2" height="12" fill="#1F3A5F"/>
    <rect x="5" y="4" width="1" height="12" fill="#1F3A5F"/>
    <rect x="7" y="4" width="2" height="12" fill="#1F3A5F"/>
    <rect x="10" y="4" width="1" height="12" fill="#1F3A5F"/>
    <rect x="12" y="4" width="3" height="12" fill="#1F3A5F"/>
    <rect x="16" y="4" width="2" height="12" fill="#1F3A5F"/>
    <rect x="1" y="2" width="4" height="1" fill="#1F3A5F"/>
    <rect x="1" y="2" width="1" height="4" fill="#1F3A5F"/>
    <rect x="15" y="2" width="4" height="1" fill="#1F3A5F"/>
    <rect x="18" y="2" width="1" height="4" fill="#1F3A5F"/>
    <rect x="1" y="17" width="4" height="1" fill="#1F3A5F"/>
    <rect x="1" y="14" width="1" height="4" fill="#1F3A5F"/>
    <rect x="15" y="17" width="4" height="1" fill="#1F3A5F"/>
    <rect x="18" y="14" width="1" height="4" fill="#1F3A5F"/>
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
  const [controvertidos, setControvertidos] = useState([]);
  const [session, setSession] = useState(null);
  const [wishlistSlugs, setWishlistSlugs] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [showWishlist, setShowWishlist] = useState(false);
  const [notFoundSuggestions, setNotFoundSuggestions] = useState([]);

  function resetSearch() {
    setSearched(false);
    setResult(null);
    setQuery("");
    setShowSuggestions(false);
  }

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

    supabase.from('valoraciones').select('libro_slug, puntuacion').then(function(res) {
      if (!res.data || res.data.length === 0) return;
      var grouped = {};
      res.data.forEach(function(v) {
        if (!grouped[v.libro_slug]) grouped[v.libro_slug] = [];
        grouped[v.libro_slug].push(v.puntuacion);
      });
      var slugsConValoraciones = Object.keys(grouped).filter(function(s) { return grouped[s].length >= 1; });
      if (slugsConValoraciones.length === 0) return;
      supabase.from('libros').select('titulo, autor, puntuacion, idioma').eq('idioma', 'es').then(function(librosRes) {
        if (!librosRes.data) return;
        var resultados = [];
        slugsConValoraciones.forEach(function(slug) {
          var libro = librosRes.data.find(function(l) { return toSlug(l.titulo) === slug; });
          if (!libro) return;
          var votes = grouped[slug];
          var mediaUsuarios = Math.round((votes.reduce(function(a, b) { return a + b; }, 0) / votes.length) * 10) / 10;
          var diferencia = Math.abs(libro.puntuacion - mediaUsuarios);
          resultados.push({ slug, titulo: libro.titulo, autor: libro.autor, puntuacionCatolicum: libro.puntuacion, mediaUsuarios, numVotos: votes.length, diferencia });
        });
        resultados.sort(function(a, b) { return b.diferencia - a.diferencia; });
        setControvertidos(resultados.slice(0, 4));
      });
    });

    function loadWishlist(userId) {
      supabase.from('wishlist').select('libro_slug').eq('user_id', userId).then(function(res) {
        if (res.data) setWishlistSlugs(res.data.map(function(r) { return r.libro_slug; }));
      });
    }

    supabase.auth.getSession().then(function(res) {
      var s = res.data.session;
      setSession(s);
      if (s) loadWishlist(s.user.id);
    });

    var { data: authListener } = supabase.auth.onAuthStateChange(function(event, s) {
      setSession(s);
      if (s) loadWishlist(s.user.id);
      else setWishlistSlugs([]);
    });

    return function() {
      window.removeEventListener("resize", checkMobile);
      authListener.subscription.unsubscribe();
    };
  }, []);

  function isInWishlist(slug) { return wishlistSlugs.includes(slug); }

  async function toggleWishlist(libro) {
    if (!session) { setShowLoginModal(true); return; }
    var slug = libro.slug;
    if (wishlistSlugs.includes(slug)) {
      await supabase.from('wishlist').delete().eq('user_id', session.user.id).eq('libro_slug', slug);
      setWishlistSlugs(function(prev) { return prev.filter(function(s) { return s !== slug; }); });
      setToast('Eliminado de tu lista');
    } else {
      await supabase.from('wishlist').insert({ user_id: session.user.id, libro_slug: slug, libro_titulo: libro.titulo, libro_autor: libro.autor, libro_puntuacion: libro.puntuacion });
      setWishlistSlugs(function(prev) { return [...prev, slug]; });
      setToast('Añadido a tu lista ♥');
    }
    setTimeout(function() { setToast(null); }, 2500);
  }

  async function handleSearch(q) {
    var term = q.trim();
    if (!term) return;
    setLoading(true);
    setSearched(true);
    setShowSuggestions(false);
    setMenuOpen(false);
    var match = await searchBook(term);
    setResult(match);
    if (!match) {
      supabase.from('libros').select('titulo, autor, puntuacion').eq('idioma', 'es').gte('puntuacion', 7).then(function(res) {
        if (res.data && res.data.length > 0) {
          var shuffled = res.data.slice().sort(function() { return Math.random() - .5; });
          setNotFoundSuggestions(shuffled.slice(0, 4));
        }
      });
    } else {
      setNotFoundSuggestions([]);
    }
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
        <title>Catolicum - Tu club de lectura católico</title>
        <meta name="description" content="Tu club de lectura católico. Descubre y comparte si un libro es compatible con la fe antes de leerlo. Análisis doctrinales de bestsellers, clásicos espirituales y mucho más." />
        <meta name="keywords" content="analisis libros fe catolica, libros polemicos cristianismo, El Código Da Vinci verdad, libros recomendados catolicos, libreria catolica" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="DJgtQhrJpw86EiMeHjn-XjbOAYSsebWi-QaTPUl6dA8" />
        <meta property="og:title" content="Catolicum - Tu club de lectura católico" />
        <meta property="og:description" content="Descubre y comparte que hay detras de cada libro. Lee con criterio. Lee con fe." />
        <meta property="og:url" content="https://catolicum.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <link rel="canonical" href="https://catolicum.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* SIDEBAR — SidebarClub con onClick en logo para resetear búsqueda */}
        {!isMobile && (
          <div onClick={function(e) {
            // Si el click viene del logo (Link href="/"), reseteamos la búsqueda
            if (e.target.closest('a[href="/"]')) resetSearch();
          }}>
            <SidebarClub currentPath="/" />
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

          {/* MÓVIL HEADER */}
          {isMobile && (
            <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
              <button onClick={resetSearch} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 19, fontWeight: 500, color: "#FAF7F0" }}>Católicum</span>
              </button>
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
                return (
                  <Link key={item.href} href={item.href} onClick={function() { setMenuOpen(false); if (item.href === "/") resetSearch(); }} style={{ display: "block", padding: "10px 0", fontSize: 14, fontFamily: "'EB Garamond', Georgia, serif", color: "#8AAFD4", textDecoration: "none", borderBottom: "0.5px solid #2A4E7F" }}>{item.label}</Link>
                );
              })}
            </div>
          )}

          {/* HERO */}
          {!searched && (
            <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: isMobile ? "1.25rem 1.25rem 1rem" : "1.5rem 2rem 1.25rem", textAlign: "center" }}>
              <h1 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 24 : 30, fontWeight: 400, color: "#FAF7F0", lineHeight: 1.2, marginBottom: ".4rem" }}>
                ¿Qué hay detrás de cada libro?
              </h1>
              <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: isMobile ? 14 : 15, fontStyle: "italic", color: "#E1B955", marginBottom: ".65rem", borderLeft: "2px solid #2A4E7F", borderRight: "2px solid #2A4E7F", display: "inline-block", padding: "0 1rem" }}>
                Lee con criterio. Lee con fe.
              </p>
              <div style={{ borderTop: "0.5px solid #2A4E7F", borderBottom: "0.5px solid #2A4E7F", padding: ".3rem 0", maxWidth: 340, margin: "0 auto" }}>
                <span style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "#8AAFD4" }}>Tu club de lectura católico</span>
              </div>
            </div>
          )}

          {/* BUSCADOR */}
          {!searched && (
            <div style={{ background: "#FAF7F0", borderBottom: "0.5px solid #E8E2D4", padding: isMobile ? "1.75rem 1.25rem" : "2rem 2rem 1.75rem", textAlign: "center" }}>
              <div style={{ position: "relative", maxWidth: 520, margin: "0 auto" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: ".75rem" }}>
                  <input
                    type="text" placeholder="Busca cualquier libro..."
                    value={query} onChange={handleInputChange} onKeyDown={handleKey}
                    onBlur={function() { setTimeout(function() { setShowSuggestions(false); }, 150); }}
                    onFocus={function() { if (suggestions.length > 0) setShowSuggestions(true); }}
                    style={{ flex: 1, height: 48, padding: "0 16px", border: "0.5px solid #D8D0BC", borderRadius: 10, background: "#fff", color: "#1F2937", fontSize: 14, fontFamily: "DM Sans, sans-serif", minWidth: 0 }}
                  />
                  <button onClick={function() { handleSearch(query); }} style={{ height: 48, padding: "0 22px", background: "#1F3A5F", color: "#FAF7F0", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "DM Sans, sans-serif", whiteSpace: "nowrap", flexShrink: 0 }}>
                    Analizar
                  </button>
                  {!isMobile && (
                    <button onClick={function() { setShowScanner(true); }} style={{ height: 48, width: 48, background: "#EEE8D8", border: "0.5px solid #D8D0BC", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <BarcodeIcon />
                    </button>
                  )}
                </div>
                {showSuggestions && (
                  <div style={{ position: "absolute", top: 52, left: 0, right: 0, background: "#fff", border: "0.5px solid #D8D0BC", borderRadius: 10, zIndex: 100, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", textAlign: "left" }}>
                    {suggestions.map(function(s) {
                      var sc = getScoreStyle(s.puntuacion);
                      return (
                        <div key={s.titulo} onMouseDown={function() { handleSelectSuggestion(s.titulo); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", borderBottom: "0.5px solid #FAF7F0" }}>
                          <span style={{ width: 28, height: 28, borderRadius: "50%", background: sc.bg, color: sc.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, flexShrink: 0 }}>{s.puntuacion}</span>
                          <span style={{ fontSize: 13, fontWeight: 500, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.titulo}</span>
                          <span style={{ fontSize: 12, color: "#6E6E73", flexShrink: 0 }}>{s.autor}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
                  {["El Código Da Vinci", "Harry Potter", "Sapiens", "El Alquimista"].map(function(ex) {
                    return (
                      <button key={ex} onClick={function() { setQuery(ex); handleSearch(ex); }} style={{ fontSize: 12, padding: "4px 12px", border: "0.5px solid #D8D0BC", borderRadius: 20, background: "#EEE8D8", color: "#1F3A5F", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
                        {ex}
                      </button>
                    );
                  })}
                  {session && (
                    <button onClick={function() { setShowWishlist(true); }} style={{ fontSize: 12, padding: "4px 12px", border: "0.5px solid #C8D4E0", borderRadius: 20, background: "none", color: "#8AAFD4", cursor: "pointer", fontFamily: "DM Sans, sans-serif", display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8AAFD4" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                      Mi lista
                    </button>
                  )}
                </div>
              </div>
              {isMobile && (
                <button onClick={function() { setShowScanner(true); }} style={{ width: "100%", maxWidth: 520, height: 44, background: "#EEE8D8", border: "0.5px solid #D8D0BC", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "#1F3A5F", margin: "8px auto 0" }}>
                  <BarcodeIcon /> Escanear codigo de barras
                </button>
              )}
            </div>
          )}

          {/* RESULTADOS */}
          {searched && (
            <div style={{ maxWidth: 680, margin: "0 auto", width: "100%", padding: isMobile ? "1.25rem 1rem" : "2rem 1.5rem" }}>
              <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: ".75rem" }}>
                  <input
                    type="text" placeholder="Busca cualquier libro..."
                    value={query} onChange={handleInputChange} onKeyDown={handleKey}
                    onBlur={function() { setTimeout(function() { setShowSuggestions(false); }, 150); }}
                    onFocus={function() { if (suggestions.length > 0) setShowSuggestions(true); }}
                    style={{ flex: 1, height: 48, padding: "0 16px", border: "0.5px solid #D8D0BC", borderRadius: 10, background: "#fff", color: "#1F2937", fontSize: 14, fontFamily: "DM Sans, sans-serif", minWidth: 0 }}
                  />
                  <button onClick={function() { handleSearch(query); }} style={{ height: 48, padding: "0 18px", background: "#1F3A5F", color: "#FAF7F0", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "DM Sans, sans-serif", whiteSpace: "nowrap", flexShrink: 0 }}>
                    Analizar
                  </button>
                </div>
                {showSuggestions && (
                  <div style={{ position: "absolute", top: 52, left: 0, right: 0, background: "#fff", border: "0.5px solid #D8D0BC", borderRadius: 10, zIndex: 100, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                    {suggestions.map(function(s) {
                      var sc = getScoreStyle(s.puntuacion);
                      return (
                        <div key={s.titulo} onMouseDown={function() { handleSelectSuggestion(s.titulo); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", borderBottom: "0.5px solid #FAF7F0" }}>
                          <span style={{ width: 28, height: 28, borderRadius: "50%", background: sc.bg, color: sc.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, flexShrink: 0 }}>{s.puntuacion}</span>
                          <span style={{ fontSize: 13, fontWeight: 500, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.titulo}</span>
                          <span style={{ fontSize: 12, color: "#6E6E73", flexShrink: 0 }}>{s.autor}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
                <button onClick={resetSearch} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "#EEE8D8", border: "0.5px solid #D8D0BC", borderRadius: 20, fontSize: 13, color: "#1F3A5F", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
                  ← Nueva búsqueda
                </button>
                {session && (
                  <button onClick={function() { setShowWishlist(true); }} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 14px", background: "none", border: "0.5px solid #C8D4E0", borderRadius: 20, fontSize: 13, color: "#8AAFD4", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8AAFD4" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    Mi lista
                  </button>
                )}
              </div>

              {loading && <div style={{ textAlign: "center", padding: "2rem", fontSize: 14, color: "#6E6E73" }}>Analizando...</div>}

              {!loading && result && (
                <>
                  <div style={{ background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 14, overflow: "hidden" }}>
                    <div style={{ padding: "1.25rem", borderBottom: "0.5px solid #EDF2F8" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: "1rem" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <Link href={"/libro/" + toSlug(result.t)} style={{ textDecoration: "none", color: "inherit" }}>
                            <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 22, fontWeight: 500, marginBottom: 4, color: "#1F3A5F" }}>{result.t}</h2>
                          </Link>
                          <p style={{ fontSize: 13, color: "#6E6E73", marginBottom: 8 }}>{result.a}{result.y ? " · " + result.y : ""}</p>
                          <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, fontWeight: 500, background: st.bg, color: st.text }}>{st.label}</span>
                        </div>
                        <div style={{ textAlign: "center", flexShrink: 0 }}>
                          <div style={{ fontSize: 10, color: "#8AAFD4", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>Católicum</div>
                          <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 44, fontWeight: 500, lineHeight: 1, color: st.color }}>{result.s}</div>
                          <div style={{ fontSize: 12, color: "#6E6E73" }}>/10</div>
                        </div>
                      </div>
                      <div style={{ height: 4, background: "#EDF2F8", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 2, background: st.color, width: (result.s * 10) + "%" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#AEAEB2", marginTop: 4 }}>
                        <span>Contrario</span><span>Neutral</span><span>Afin</span>
                      </div>
                    </div>
                    <div style={{ padding: "1.25rem" }}>
                      <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#AEAEB2", marginBottom: 6 }}>Análisis doctrinal</p>
                      <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.7, marginBottom: "1.1rem" }}>{result.an}</p>
                      {result.tags && result.tags.length > 0 && (
                        <div style={{ marginBottom: "1.1rem" }}>
                          <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#AEAEB2", marginBottom: 6 }}>Temas presentes</p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                            {result.tags.map(function(tag) {
                              return (<span key={tag} style={{ fontSize: 12, padding: "3px 9px", border: "0.5px solid #C8D4E0", borderRadius: 20, color: "#1F3A5F" }}>{tag}</span>);
                            })}
                          </div>
                        </div>
                      )}
                      <div style={{ display: "flex", gap: 6, fontSize: 12, paddingTop: "1rem", borderTop: "0.5px solid #EDF2F8", marginBottom: ".5rem" }}>
                        <span style={{ fontWeight: 500, color: "#6E6E73", flexShrink: 0 }}>Referencia:</span>
                        <span style={{ color: "#AEAEB2" }}>{result.ref}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: ".75rem" }}>
                        <a href={"https://www.amazon.es/s?k=" + encodeURIComponent(result.t + " " + result.a) + "&tag=catolicum-21"} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 16px", background: "#EEE8D8", border: "0.5px solid #D8D0BC", borderRadius: 8, fontSize: 13, color: "#1F3A5F", textDecoration: "none" }}>
                          Encontrar en Amazon
                        </a>
                        <HeartButton
                          libro={{ slug: toSlug(result.t), titulo: result.t, autor: result.a, puntuacion: result.s }}
                          isInWishlist={isInWishlist}
                          onToggle={toggleWishlist}
                          onNeedLogin={function() { setShowLoginModal(true); }}
                          hasUser={!!session}
                        />
                      </div>
                    </div>
                  </div>
                  <Valoracion libroSlug={toSlug(result.t)} />
                </>
              )}

              {!loading && !result && (
                <div>
                  <div style={{ background: "#fff", border: "0.5px dashed #C8D4E0", borderRadius: 14, padding: "2rem 1.5rem", textAlign: "center", marginBottom: "1rem" }}>
                    <div style={{ fontSize: 26, marginBottom: 10 }}>⏳</div>
                    <h3 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 20, fontWeight: 500, marginBottom: 6, color: "#1F3A5F" }}>
                      "{query}" aún no está en nuestra base de datos
                    </h3>
                    <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.6 }}>Estamos ampliando continuamente la colección. Vuelve a intentarlo más tarde.</p>
                  </div>
                  {notFoundSuggestions.length > 0 && (
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#8AAFD4", marginBottom: 10 }}>Mientras tanto, prueba con estos</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {notFoundSuggestions.map(function(s) {
                          var sc = getScoreStyle(s.puntuacion);
                          return (
                            <div key={s.titulo} onClick={function() { setQuery(s.titulo); handleSearch(s.titulo); }} style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 10, padding: ".75rem 1rem", cursor: "pointer" }}>
                              <div style={{ width: 28, height: 28, borderRadius: "50%", background: sc.bg, color: sc.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, flexShrink: 0 }}>{s.puntuacion}</div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 500, color: "#1F3A5F", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.titulo}</div>
                                <div style={{ fontSize: 12, color: "#6E6E73" }}>{s.autor}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* SECCIONES HOMEPAGE */}
          {!searched && (
            <div>
              {/* LOS MÁS BUSCADOS */}
              <div style={{ background: "#EDF2F8", padding: isMobile ? "1.25rem 1rem" : "1.5rem 2rem", borderBottom: "0.5px solid #D4DDE8" }}>
                <div style={{ maxWidth: 680, margin: "0 auto" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: ".75rem" }}>
                    <p style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#1F3A5F" }}>Los más buscados</p>
                    <p style={{ fontSize: 12, color: "#8A9AAA" }}>Libros populares analizados</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 8 }}>
                    {POLEMIC_BOOKS.map(function(b) {
                      var st2 = getScoreStyle(b.puntuacion);
                      return (
                        <div key={b.titulo} onClick={function() { setQuery(b.titulo); handleSearch(b.titulo); }} style={{ background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 10, padding: ".85rem", cursor: "pointer", position: "relative" }}>
                          <div style={{ position: "absolute", top: 8, right: 8, width: 26, height: 26, borderRadius: "50%", background: st2.bg, color: st2.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500 }}>{b.puntuacion}</div>
                          <p style={{ fontSize: 13, fontWeight: 500, color: "#1F2937", lineHeight: 1.3, marginBottom: 3, paddingRight: 30 }}>{b.titulo}</p>
                          <p style={{ fontSize: 11, color: "#6E6E73" }}>{b.autor}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* LOS MÁS CONTROVERTIDOS */}
              {controvertidos.length > 0 && (
                <div style={{ background: "#FAF7F0", padding: isMobile ? "1.25rem 1rem" : "1.5rem 2rem", borderBottom: "0.5px solid #E8E2D4" }}>
                  <div style={{ maxWidth: 680, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: ".75rem" }}>
                      <p style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#A32D2D" }}>🔥 Los más controvertidos</p>
                      <p style={{ fontSize: 12, color: "#8A9AAA" }}>Donde el club debate más</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {controvertidos.map(function(b) {
                        var stCat = getScoreStyle(b.puntuacionCatolicum);
                        var stUser = getScoreStyle(Math.round(b.mediaUsuarios));
                        return (
                          <div key={b.slug} onClick={function() { setQuery(b.titulo); handleSearch(b.titulo); }} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 10, padding: ".75rem 1rem", cursor: "pointer" }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13, fontWeight: 500, color: "#1F3A5F", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.titulo}</div>
                              <div style={{ fontSize: 11, color: "#6E6E73" }}>{b.autor} · {b.numVotos} {b.numVotos === 1 ? "voto" : "votos"}</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                              <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: 9, color: "#8AAFD4", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 2 }}>Católicum</div>
                                <div style={{ width: 32, height: 32, borderRadius: "50%", background: stCat.bg, color: stCat.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>{b.puntuacionCatolicum}</div>
                              </div>
                              <div style={{ fontSize: 14, color: "#D8D0BC" }}>vs</div>
                              <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: 9, color: "#8AAFD4", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 2 }}>Club</div>
                                <div style={{ width: 32, height: 32, borderRadius: "50%", background: stUser.bg, color: stUser.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>{b.mediaUsuarios}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* RECOMENDADOS */}
              <div style={{ background: "#FAF7F0", padding: isMobile ? "1.25rem 1rem" : "1.5rem 2rem", borderBottom: "0.5px solid #E8E2D4" }}>
                <div style={{ maxWidth: 680, margin: "0 auto" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: ".75rem" }}>
                    <p style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#1F3A5F" }}>Para el lector católico</p>
                    <Link href="/recomendados" style={{ fontSize: 12, color: "#E1B955", textDecoration: "none" }}>Ver todos →</Link>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
                    {recomendados.map(function(b) {
                      var rs = getScoreStyle(b.puntuacion);
                      var slug = toSlug(b.titulo);
                      return (
                        <div key={b.titulo} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "0.5px solid #D8D0BC", borderRadius: 10, padding: ".75rem 1rem" }}>
                          <Link href={"/recomendados/" + slug} style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                            {b.imagen_url ? (
                              <img src={b.imagen_url} alt={b.titulo} style={{ width: 36, height: 50, borderRadius: 4, objectFit: "cover", flexShrink: 0 }} />
                            ) : (
                              <div style={{ width: 36, height: 50, borderRadius: 4, background: "#EDF2F8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <svg width="14" height="14" viewBox="0 0 14 14"><rect x="5.5" y="1" width="3" height="12" rx="1.5" fill="#2A4E7F"/><rect x="1" y="4.5" width="12" height="3" rx="1.5" fill="#2A4E7F"/></svg>
                              </div>
                            )}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "#1F2937" }}>{b.titulo}</div>
                              <div style={{ fontSize: 12, color: "#6E6E73" }}>{b.autor}</div>
                            </div>
                          </Link>
                          <div style={{ width: 30, height: 30, borderRadius: "50%", background: rs.bg, color: rs.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, flexShrink: 0 }}>{b.puntuacion}</div>
                          <HeartButton
                            libro={{ slug: slug, titulo: b.titulo, autor: b.autor, puntuacion: b.puntuacion }}
                            isInWishlist={isInWishlist}
                            onToggle={toggleWishlist}
                            onNeedLogin={function() { setShowLoginModal(true); }}
                            hasUser={!!session}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* CLUB CTA */}
              <div style={{ background: "#EDF2F8", padding: isMobile ? "1.25rem 1rem" : "1.5rem 2rem", borderBottom: "0.5px solid #D4DDE8" }}>
                <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 20, color: "#1F3A5F", marginBottom: 4 }}>¿Tu opinión importa?</p>
                    <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.5 }}>Únete al club y valora cualquier libro. Gratis, con Google.</p>
                  </div>
                  <Link href="/club" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", background: "#1F3A5F", color: "#FAF7F0", borderRadius: 10, fontSize: 13, textDecoration: "none", fontFamily: "DM Sans, sans-serif", fontWeight: 500, flexShrink: 0 }}>
                    Ver el club →
                  </Link>
                </div>
              </div>

              {/* STATS */}
              <div style={{ background: "#1F3A5F", padding: isMobile ? "1.25rem 1rem" : "1.5rem 2rem" }}>
                <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", justifyContent: "space-around", textAlign: "center" }}>
                  <div>
                    <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 28, fontWeight: 400, color: "#FAF7F0" }}>{totalLibros || "200+"}</div>
                    <div style={{ fontSize: 12, color: "#8AAFD4", marginTop: 2 }}>libros analizados</div>
                  </div>
                  <div style={{ width: 1, background: "#2A4E7F" }} />
                  <div>
                    <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 28, fontWeight: 400, color: "#E1B955" }}>gratis</div>
                    <div style={{ fontSize: 12, color: "#8AAFD4", marginTop: 2 }}>sin registro</div>
                  </div>
                  <div style={{ width: 1, background: "#2A4E7F" }} />
                  <div>
                    <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 28, fontWeight: 400, color: "#FAF7F0" }}>1-10</div>
                    <div style={{ fontSize: 12, color: "#8AAFD4", marginTop: 2 }}>escala de afinidad</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <footer style={{ background: "#FAF7F0", borderTop: "0.5px solid #E8E2D4", padding: "1.5rem" }}>
            <p style={{ fontSize: 11, color: "#AEAEB2", lineHeight: 1.65, textAlign: "center", marginBottom: 8 }}>
              Proyecto independiente, no afiliado a la Iglesia Católica ni a ninguna institución religiosa oficial.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, fontSize: 12 }}>
              <Link href="/acerca" style={{ color: "#AEAEB2", textDecoration: "none" }}>Acerca de</Link>
              <span style={{ color: "#D8D0BC" }}>·</span>
              <Link href="/privacidad" style={{ color: "#AEAEB2", textDecoration: "none" }}>Privacidad</Link>
              <span style={{ color: "#D8D0BC" }}>·</span>
              <Link href="/contacto" style={{ color: "#AEAEB2", textDecoration: "none" }}>Contacto</Link>
            </div>
          </footer>
        </div>
      </div>

      {showScanner && (
        <BarcodeScanner onDetected={handleBarcodeDetected} onClose={function() { setShowScanner(false); }} />
      )}

      {/* TOAST */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#1F3A5F", color: "#FAF7F0", fontSize: 13, padding: "10px 20px", borderRadius: 20, zIndex: 2000, pointerEvents: "none", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(0,0,0,.2)" }}>
          {toast}
        </div>
      )}

      {/* MODAL LOGIN */}
      {showLoginModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={function() { setShowLoginModal(false); }} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.4)" }} />
          <div style={{ position: "relative", background: "#FAF7F0", borderRadius: 14, padding: "2rem 1.75rem", maxWidth: 340, width: "90%", textAlign: "center" }}>
            <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 22, color: "#1F3A5F", marginBottom: 8 }}>Inicia sesión</p>
            <p style={{ fontSize: 13, color: "#6E6E73", marginBottom: 20, lineHeight: 1.5 }}>Para guardar libros en tu lista necesitas una cuenta.</p>
            <button
              onClick={function() { setShowLoginModal(false); signInWithGoogle(); }}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 20px", background: "#1F3A5F", color: "#FAF7F0", border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontWeight: 500 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continuar con Google
            </button>
            <button onClick={function() { setShowLoginModal(false); }} style={{ display: "block", margin: "12px auto 0", fontSize: 12, color: "#8AAFD4", background: "none", border: "none", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* WISHLIST PANEL */}
      {showWishlist && session && (
        <WishlistPanel
          userId={session.user.id}
          onClose={function() { setShowWishlist(false); }}
          onRemove={function(slug) { setWishlistSlugs(function(prev) { return prev.filter(function(s) { return s !== slug; }); }); }}
        />
      )}
    </div>
  );
}