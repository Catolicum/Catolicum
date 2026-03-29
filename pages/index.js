import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { BOOKS } from "../lib/books";
import { supabase } from "../lib/supabase";
import { signInWithGoogle } from "../lib/auth";
import HeartButton from "../components/HeartButton";
import WishlistPanel from "../components/WishlistPanel";

function getScoreStyle(s) {
  if (s >= 9) return { color: "#1D9E75", bg: "#EAF3DE", text: "#085041", label: "Muy afín" };
  if (s >= 7) return { color: "#639922", bg: "#EAF3DE", text: "#27500A", label: "Favorable" };
  if (s >= 5) return { color: "#888780", bg: "#F1EFE8", text: "#444441", label: "Neutral" };
  if (s >= 3) return { color: "#BA7517", bg: "#FAEEDA", text: "#633806", label: "Crítico" };
  return { color: "#A32D2D", bg: "#FCEBEB", text: "#791F1F", label: "Contrario" };
}

function normalize(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Generar slug consistente con el resto de la app
function toSlug(titulo, autor) {
  return normalize(titulo + "-" + autor).replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// Sugerir libros similares cuando no se encuentra uno (mismo idioma, ordenados por relevancia)
function getSuggestions(lang, limit = 4) {
  return BOOKS
    .filter((b) => b.l === lang && b.s >= 7)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
}

const NAV = [
  { label: "Home", href: "/", icon: "⌂" },
  { label: "Misión", href: "/mision", icon: "✦" },
  { label: "Libros recomendados", href: "/recomendados", icon: "☆" },
  { label: "Contacto", href: "/contacto", icon: "✉" },
];

const RECOMMENDED = BOOKS.filter((b) => b.s >= 9 && b.l === "es").slice(0, 6);

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [lang, setLang] = useState("es");
  const [menuOpen, setMenuOpen] = useState(false);

  // Auth
  const [user, setUser] = useState(null);

  // Wishlist (slugs guardados)
  const [wishlistSlugs, setWishlistSlugs] = useState([]);
  const [wishlistRefresh, setWishlistRefresh] = useState(0);

  // Toast
  const [toast, setToast] = useState(null);

  // Login modal
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Sugerencias para estado vacío
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data?.session?.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription?.unsubscribe();
  }, []);

  // Cargar wishlist cuando cambia el user
  useEffect(() => {
    if (!user) { setWishlistSlugs([]); return; }
    supabase
      .from("wishlist")
      .select("libro_slug")
      .eq("user_id", user.id)
      .then(({ data }) => setWishlistSlugs(data ? data.map((r) => r.libro_slug) : []));
  }, [user, wishlistRefresh]);

  function isInWishlist(slug) {
    return wishlistSlugs.includes(slug);
  }

  async function toggleWishlist(libro) {
    if (!user) { setShowLoginPrompt(true); return; }
    const slug = libro.slug;
    if (isInWishlist(slug)) {
      await supabase.from("wishlist").delete().eq("user_id", user.id).eq("libro_slug", slug);
      setWishlistSlugs((prev) => prev.filter((s) => s !== slug));
      showToast("Eliminado de tu lista");
    } else {
      await supabase.from("wishlist").insert({
        user_id: user.id,
        libro_slug: slug,
        libro_titulo: libro.titulo,
        libro_autor: libro.autor,
        libro_puntuacion: libro.puntuacion,
      });
      setWishlistSlugs((prev) => [...prev, slug]);
      setWishlistRefresh((n) => n + 1);
      showToast("❤️ Añadido a tu lista");
    }
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  function handleSearch(q) {
    const term = normalize(q.trim());
    if (!term) return;
    setSearched(true);
    const match = BOOKS.find((b) => {
      const titleMatch = normalize(b.t).includes(term);
      const authorMatch = normalize(b.a).includes(term);
      const langMatch = b.l === lang;
      return (titleMatch || authorMatch) && langMatch;
    });
    setResult(match || null);
    if (!match) {
      setSuggestions(getSuggestions(lang));
    }
  }

  function handleKey(e) {
    if (e.key === "Enter") handleSearch(query);
  }

  function resetSearch() {
    setQuery("");
    setResult(null);
    setSearched(false);
  }

  const examples =
    lang === "es"
      ? ["El Código Da Vinci", "Summa Theologica", "Harry Potter", "El Alquimista", "Sapiens"]
      : ["The Da Vinci Code", "Lord of the Rings", "Harry Potter", "The God Delusion", "Sapiens"];

  const st = result ? getScoreStyle(result.s) : null;

  // Objeto libro normalizado para HeartButton / wishlist
  const resultLibro = result
    ? {
        slug: toSlug(result.t, result.a),
        titulo: result.t,
        autor: result.a,
        puntuacion: result.s,
      }
    : null;

  return (
    <>
      <Head>
        <title>Catolicum — La Librería Católica</title>
        <meta name="description" content="Descubre si un libro es compatible con la fe católica. Análisis doctrinal basado en fuentes públicas." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8107872231396052" crossOrigin="anonymous"></script>
      </Head>

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}

      {/* LOGIN PROMPT MODAL */}
      {showLoginPrompt && (
        <div className="modal-overlay" onClick={() => setShowLoginPrompt(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">♡</div>
            <h3 className="modal-title">Guarda tu lista de lectura</h3>
            <p className="modal-text">Inicia sesión con Google para guardar libros en tu wishlist y acceder desde cualquier dispositivo.</p>
            <button
              className="modal-btn"
              onClick={() => { signInWithGoogle(); setShowLoginPrompt(false); }}
            >
              Continuar con Google
            </button>
            <button className="modal-cancel" onClick={() => setShowLoginPrompt(false)}>
              Ahora no
            </button>
          </div>
        </div>
      )}

      <div className="layout">

        {/* SIDEBAR escritorio */}
        <aside className="sidebar">
          <button className="sidebar-logo-btn" onClick={resetSearch}>
            <div className="logo-icon">✝</div>
            <div>
              <div className="logo-title">Catolicum</div>
              <div className="logo-tagline">La Librería Católica</div>
            </div>
          </button>
          <nav className="sidebar-nav">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="nav-item">
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* SECCIÓN WISHLIST EN SIDEBAR */}
          <div className="sidebar-section">
            <div className="sidebar-section-header">
              <span className="sidebar-section-icon">♡</span>
              <span className="sidebar-section-title">Mi lista</span>
              {wishlistSlugs.length > 0 && (
                <span className="sidebar-section-count">{wishlistSlugs.length}</span>
              )}
            </div>
            <WishlistPanel user={user} refreshTrigger={wishlistRefresh} />
            {!user && (
              <button
                className="sidebar-login-btn"
                onClick={signInWithGoogle}
              >
                Iniciar sesión
              </button>
            )}
          </div>

          <div className="sidebar-footer">
            <Link href="/privacidad" className="sidebar-link">Privacidad</Link>
            <Link href="/acerca" className="sidebar-link">Acerca de</Link>
          </div>
        </aside>

        {/* MÓVIL header */}
        <div className="mobile-header">
          <button className="mobile-logo-btn" onClick={resetSearch}>
            <div className="logo-icon-sm">✝</div>
            <span className="mobile-title">Catolicum</span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {user ? (
              <div className="mobile-avatar" title={user.email}>
                {user.user_metadata?.avatar_url
                  ? <img src={user.user_metadata.avatar_url} alt="avatar" className="avatar-img" />
                  : <span>{user.email?.[0]?.toUpperCase()}</span>}
              </div>
            ) : (
              <button className="mobile-login-btn" onClick={signInWithGoogle}>Entrar</button>
            )}
            <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="mobile-nav-item" onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            {/* Wishlist móvil rápido */}
            <div className="mobile-wishlist-row">
              <span className="mobile-wishlist-label">♡ Mi lista</span>
              {wishlistSlugs.length === 0
                ? <span className="mobile-wishlist-empty">Vacía</span>
                : <span className="mobile-wishlist-count">{wishlistSlugs.length} libros</span>}
            </div>
          </div>
        )}

        {/* CONTENIDO */}
        <div className="content">

          <div className="ad-banner">
            <span className="ad-label">Publicidad</span>
            <div className="ad-placeholder">[ Google AdSense ]</div>
          </div>

          <main className="main">

            <div className="lang-row">
              <button
                className={`lang-btn ${lang === "es" ? "active" : ""}`}
                onClick={() => { setLang("es"); setSearched(false); setResult(null); setQuery(""); }}
              >
                Español
              </button>
              <button
                className={`lang-btn ${lang === "en" ? "active" : ""}`}
                onClick={() => { setLang("en"); setSearched(false); setResult(null); setQuery(""); }}
              >
                English
              </button>
            </div>

            <div className="search-wrap">
              <div className="search-row">
                <input
                  className="search-input"
                  type="text"
                  placeholder={lang === "es" ? "Título del libro o nombre del autor..." : "Book title or author name..."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKey}
                />
                <button className="search-btn" onClick={() => handleSearch(query)}>
                  {lang === "es" ? "Analizar" : "Analyse"}
                </button>
              </div>
              <div className="examples-row">
                <span className="examples-label">{lang === "es" ? "Ejemplos:" : "Examples:"}</span>
                {examples.map((ex) => (
                  <button key={ex} className="chip" onClick={() => { setQuery(ex); handleSearch(ex); }}>
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {searched && (
              <div className="result-area">
                {result ? (
                  <div className="result-card">
                    <div className="result-header">
                      <div className="result-meta">
                        <div className="book-info">
                          <h2 className="book-title">{result.t}</h2>
                          <p className="book-author">{result.a}{result.y ? ` · ${result.y}` : ""}</p>
                          <span className="category-pill" style={{ background: st.bg, color: st.text }}>
                            {st.label}
                          </span>
                        </div>
                        <div className="result-right">
                          <div className="score-box">
                            <div className="score-num" style={{ color: st.color }}>{result.s}</div>
                            <div className="score-denom">/10</div>
                          </div>
                          {/* HEART BUTTON */}
                          <HeartButton
                            libro={resultLibro}
                            user={user}
                            isInWishlist={isInWishlist}
                            onToggle={toggleWishlist}
                            onNeedLogin={() => setShowLoginPrompt(true)}
                          />
                        </div>
                      </div>
                      <div className="score-bar-wrap">
                        <div className="score-bar-track">
                          <div className="score-bar-fill" style={{ width: `${result.s * 10}%`, background: st.color }} />
                        </div>
                        <div className="score-legend">
                          <span>{lang === "es" ? "Contrario" : "Against"}</span>
                          <span>{lang === "es" ? "Neutral" : "Neutral"}</span>
                          <span>{lang === "es" ? "Afín" : "Aligned"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="result-body">
                      <p className="section-label">{lang === "es" ? "Análisis doctrinal" : "Doctrinal analysis"}</p>
                      <p className="analysis-text">{result.an}</p>
                      {result.tags?.length > 0 && (
                        <>
                          <p className="section-label">{lang === "es" ? "Temas presentes" : "Key themes"}</p>
                          <div className="tags-row">
                            {result.tags.map((tag) => (
                              <span key={tag} className="tag">{tag}</span>
                            ))}
                          </div>
                        </>
                      )}
                      <div className="ref-row">
                        <span className="ref-label">{lang === "es" ? "Referencia:" : "Reference:"}</span>
                        <span className="ref-text">{result.ref}</span>
                      </div>
                      <div className="result-actions">
                        <a
                          className="amazon-btn"
                          href={`https://www.amazon.es/s?k=${encodeURIComponent(result.t + " " + result.a)}&tag=catolicum-21`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                          </svg>
                          {lang === "es" ? "Encontrar en Amazon" : "Find on Amazon"}
                        </a>
                        <button
                          className="save-btn"
                          onClick={() => toggleWishlist(resultLibro)}
                        >
                          {isInWishlist(resultLibro.slug) ? "❤️ Guardado" : "♡ Guardar en mi lista"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── ESTADO VACÍO MEJORADO ── */
                  <div className="not-found">
                    <div className="nf-icon">🔍</div>
                    <h3 className="nf-title">{lang === "es" ? "Libro en análisis" : "Book under analysis"}</h3>
                    <p className="nf-text">
                      {lang === "es"
                        ? `No hemos analizado "${query}" todavía. Estamos ampliando continuamente nuestra base de datos.`
                        : `We haven't analysed "${query}" yet. We are continuously expanding our database.`}
                    </p>

                    {/* Sugerencias similares */}
                    {suggestions.length > 0 && (
                      <div className="nf-suggestions">
                        <p className="nf-suggestions-label">
                          {lang === "es" ? "Mientras tanto, quizás te interese:" : "In the meantime, you might enjoy:"}
                        </p>
                        <div className="nf-suggestions-grid">
                          {suggestions.map((b) => {
                            const ss = getScoreStyle(b.s);
                            return (
                              <button
                                key={b.t}
                                className="nf-suggestion-card"
                                onClick={() => { setQuery(b.t); handleSearch(b.t); }}
                              >
                                <div className="nf-sug-score" style={{ background: ss.bg, color: ss.text }}>
                                  {b.s}
                                </div>
                                <div className="nf-sug-info">
                                  <div className="nf-sug-title">{b.t}</div>
                                  <div className="nf-sug-author">{b.a}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <button className="nf-reset" onClick={resetSearch}>
                      {lang === "es" ? "← Volver al inicio" : "← Back to home"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {searched && (
              <div className="ad-banner ad-mid">
                <span className="ad-label">Publicidad</span>
                <div className="ad-placeholder">[ Google AdSense ]</div>
              </div>
            )}

            {!searched && (
              <>
                <div className="stats-row">
                  <div className="stat-card">
                    <div className="stat-num">{BOOKS.filter((b) => b.l === lang).length}</div>
                    <div className="stat-label">{lang === "es" ? "libros analizados" : "books analysed"}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num" style={{ color: "#1D9E75" }}>
                      {BOOKS.filter((b) => b.l === lang && b.s >= 7).length}
                    </div>
                    <div className="stat-label">{lang === "es" ? "favorables" : "aligned"}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num" style={{ color: "#A32D2D" }}>
                      {BOOKS.filter((b) => b.l === lang && b.s <= 3).length}
                    </div>
                    <div className="stat-label">{lang === "es" ? "contrarios" : "against"}</div>
                  </div>
                </div>

                <div className="rec-section">
                  <h2 className="rec-title">Recomendados para católicos</h2>
                  <div className="rec-grid">
                    {RECOMMENDED.map((b) => {
                      const rs = getScoreStyle(b.s);
                      const rLibro = {
                        slug: toSlug(b.t, b.a),
                        titulo: b.t,
                        autor: b.a,
                        puntuacion: b.s,
                      };
                      return (
                        <div
                          key={b.t}
                          className="rec-card"
                          onClick={() => { setQuery(b.t); handleSearch(b.t); }}
                        >
                          <div className="rec-score" style={{ background: rs.bg, color: rs.text }}>{b.s}</div>
                          <div className="rec-info">
                            <div className="rec-book-title">{b.t}</div>
                            <div className="rec-author">{b.a}</div>
                          </div>
                          <HeartButton
                            libro={rLibro}
                            user={user}
                            isInWishlist={isInWishlist}
                            onToggle={toggleWishlist}
                            onNeedLogin={() => setShowLoginPrompt(true)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

          </main>

          <footer className="footer">
            <p className="disclaimer">
              Proyecto independiente, no afiliado a la Iglesia Católica ni a ninguna institución religiosa oficial.
              Las valoraciones se basan en análisis de fuentes públicas y no representan posiciones doctrinales oficiales.
            </p>
            <div className="footer-links">
              <Link href="/acerca">Acerca de</Link>
              <span>·</span>
              <Link href="/privacidad">Política de Privacidad</Link>
              <span>·</span>
              <Link href="/contacto">Contacto</Link>
            </div>
          </footer>

          <div className="ad-banner">
            <span className="ad-label">Publicidad</span>
            <div className="ad-placeholder">[ Google AdSense ]</div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 16px; }
        body { font-family: 'DM Sans', sans-serif; background: #FAF8F4; color: #2C2C2A; min-height: 100vh; }
        a { color: inherit; }
      `}</style>

      <style jsx>{`
        .layout { display: flex; min-height: 100vh; }

        /* ── TOAST ── */
        .toast {
          position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
          background: #2C2C2A; color: #FAF8F4;
          padding: 10px 20px; border-radius: 20px;
          font-size: 13px; z-index: 1000;
          animation: fadeInUp .25s ease;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        /* ── MODAL ── */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.4);
          display: flex; align-items: center; justify-content: center;
          z-index: 999; padding: 1rem;
        }
        .modal-box {
          background: #fff; border-radius: 16px; padding: 2rem 1.5rem;
          max-width: 360px; width: 100%; text-align: center;
          box-shadow: 0 8px 40px rgba(0,0,0,0.15);
        }
        .modal-icon { font-size: 32px; color: #e8788a; margin-bottom: .75rem; }
        .modal-title { font-family: 'EB Garamond', serif; font-size: 22px; font-weight: 500; margin-bottom: .5rem; }
        .modal-text { font-size: 13px; color: #888780; line-height: 1.6; margin-bottom: 1.25rem; }
        .modal-btn {
          width: 100%; padding: 11px; background: #2C2C2A; color: #FAF8F4;
          border: none; border-radius: 10px; font-size: 14px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; margin-bottom: .5rem;
        }
        .modal-btn:hover { background: #444441; }
        .modal-cancel {
          width: 100%; padding: 8px; background: none; border: none;
          font-size: 13px; color: #B4B2A9; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }
        .modal-cancel:hover { color: #888780; }

        /* ── SIDEBAR ── */
        .sidebar {
          width: 220px; flex-shrink: 0;
          background: #1F3A5F;
          border-right: 0.5px solid #2A4E7F;
          display: flex; flex-direction: column;
          padding: 1.5rem 1rem;
          position: sticky; top: 0; height: 100vh;
          overflow-y: auto;
        }
        .sidebar-logo-btn {
          display: flex; align-items: center; gap: 10px; margin-bottom: 2rem;
          background: none; border: none; cursor: pointer; text-align: left; padding: 0;
        }
        .logo-icon {
          width: 36px; height: 36px; border-radius: 8px;
          background: #E1B955; color: #1F3A5F;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; flex-shrink: 0;
        }
        .logo-title { font-family: 'EB Garamond', serif; font-size: 20px; font-weight: 500; color: #FAF7F0; line-height: 1.1; }
        .logo-tagline { font-family: 'EB Garamond', serif; font-size: 12px; font-style: italic; color: #8AAFD4; margin-top: 2px; }
        .sidebar-nav { display: flex; flex-direction: column; gap: 2px; }
        .nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 10px; border-radius: 8px;
          font-size: 13px; color: #8AAFD4; text-decoration: none;
          transition: all .15s;
        }
        .nav-item:hover { background: rgba(255,255,255,0.08); color: #FAF7F0; }
        .nav-icon { font-size: 14px; width: 18px; text-align: center; }

        /* ── SIDEBAR WISHLIST SECTION ── */
        .sidebar-section {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 0.5px solid #2A4E7F;
          flex: 1;
        }
        .sidebar-section-header {
          display: flex; align-items: center; gap: 6px;
          margin-bottom: .75rem;
        }
        .sidebar-section-icon { font-size: 13px; color: #e8788a; }
        .sidebar-section-title { font-size: 11px; font-weight: 500; color: #8AAFD4; text-transform: uppercase; letter-spacing: .06em; flex: 1; }
        .sidebar-section-count {
          font-size: 10px; background: #e8788a; color: #fff;
          border-radius: 10px; padding: 1px 6px; font-weight: 600;
        }
        .sidebar-login-btn {
          width: 100%; margin-top: .75rem; padding: 7px;
          background: rgba(255,255,255,0.08); border: 0.5px solid rgba(255,255,255,0.15);
          border-radius: 8px; color: #8AAFD4; font-size: 12px;
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .15s;
        }
        .sidebar-login-btn:hover { background: rgba(255,255,255,0.14); color: #FAF7F0; }

        .sidebar-footer {
          display: flex; flex-direction: column; gap: 4px;
          padding-top: 1rem; border-top: 0.5px solid #2A4E7F; margin-top: auto;
        }
        .sidebar-link { font-size: 11px; color: #4A6A8A; text-decoration: none; padding: 3px 0; }
        .sidebar-link:hover { color: #8AAFD4; }

        /* ── MOBILE ── */
        .mobile-header {
          display: none;
          align-items: center; justify-content: space-between;
          padding: .75rem 1rem;
          background: #1F3A5F;
          border-bottom: 0.5px solid #2A4E7F;
          position: sticky; top: 0; z-index: 10;
          width: 100%;
        }
        .mobile-logo-btn {
          display: flex; align-items: center; gap: 8px;
          background: none; border: none; cursor: pointer;
        }
        .logo-icon-sm {
          width: 28px; height: 28px; border-radius: 6px;
          background: #E1B955; color: #1F3A5F;
          display: flex; align-items: center; justify-content: center; font-size: 13px;
        }
        .mobile-title { font-family: 'EB Garamond', serif; font-size: 20px; font-weight: 500; color: #FAF7F0; }
        .burger { background: none; border: none; font-size: 18px; cursor: pointer; color: #FAF7F0; }
        .mobile-login-btn {
          font-size: 12px; padding: 5px 12px;
          background: rgba(255,255,255,0.1); border: 0.5px solid rgba(255,255,255,0.2);
          border-radius: 6px; color: #FAF7F0; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }
        .mobile-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          background: #8AAFD4; color: #1F3A5F;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 600; overflow: hidden;
        }
        .avatar-img { width: 100%; height: 100%; object-fit: cover; }
        .mobile-menu {
          display: flex; flex-direction: column;
          background: #1F3A5F;
          border-bottom: 0.5px solid #2A4E7F;
          padding: .5rem 1rem 1rem;
          width: 100%;
        }
        .mobile-nav-item {
          padding: 10px 0; font-size: 14px; color: #8AAFD4;
          text-decoration: none; border-bottom: 0.5px solid #2A4E7F;
        }
        .mobile-wishlist-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 0; font-size: 13px; color: #8AAFD4;
        }
        .mobile-wishlist-label { font-weight: 500; color: #e8788a; }
        .mobile-wishlist-empty { color: #4A6A8A; font-size: 12px; }
        .mobile-wishlist-count { color: #E1B955; font-size: 12px; font-weight: 500; }

        /* ── CONTENT ── */
        .content { flex: 1; display: flex; flex-direction: column; min-width: 0; }
        .main { flex: 1; max-width: 680px; margin: 0 auto; width: 100%; padding: 2rem 1rem 1rem; }

        .ad-banner {
          width: 100%; background: #F1EFE8;
          border-bottom: 0.5px solid #D3D1C7;
          padding: 8px 16px; display: flex; align-items: center; gap: 12px;
        }
        .ad-mid { border-top: 0.5px solid #D3D1C7; border-bottom: 0.5px solid #D3D1C7; margin: 1.5rem 0; }
        .ad-label { font-size: 10px; color: #888780; text-transform: uppercase; letter-spacing: .06em; flex-shrink: 0; }
        .ad-placeholder {
          flex: 1; text-align: center; font-size: 12px; color: #B4B2A9;
          padding: 18px 0; border: 0.5px dashed #D3D1C7; border-radius: 6px;
        }

        .lang-row { display: flex; gap: 6px; justify-content: center; margin-bottom: 1.5rem; }
        .lang-btn {
          padding: 5px 18px; border-radius: 20px; font-size: 13px;
          border: 0.5px solid #D3D1C7; background: #fff;
          color: #888780; cursor: pointer; transition: all .15s;
          font-family: 'DM Sans', sans-serif;
        }
        .lang-btn.active { background: #2C2C2A; color: #FAF8F4; border-color: #2C2C2A; }

        .search-wrap { margin-bottom: 1.5rem; }
        .search-row { display: flex; gap: 8px; margin-bottom: .75rem; }
        .search-input {
          flex: 1; height: 48px; padding: 0 16px;
          border: 0.5px solid #D3D1C7; border-radius: 10px;
          background: #fff; color: #2C2C2A; font-size: 14px;
          font-family: 'DM Sans', sans-serif; transition: border-color .15s;
        }
        .search-input:focus { outline: none; border-color: #888780; }
        .search-btn {
          height: 48px; padding: 0 22px;
          background: #1F3A5F; color: #FAF8F4;
          border: none; border-radius: 10px; font-size: 14px;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background .15s; white-space: nowrap;
        }
        .search-btn:hover { background: #2A4E7F; }
        .examples-row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
        .examples-label { font-size: 12px; color: #888780; }
        .chip {
          font-size: 12px; padding: 4px 12px;
          border: 0.5px solid #D3D1C7; border-radius: 20px;
          background: #fff; color: #5F5E5A; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all .15s;
        }
        .chip:hover { border-color: #888780; color: #2C2C2A; }

        /* ── RESULT CARD ── */
        .result-area { margin-bottom: 1rem; }
        .result-card { background: #fff; border: 0.5px solid #D3D1C7; border-radius: 14px; overflow: hidden; }
        .result-header { padding: 1.25rem; border-bottom: 0.5px solid #F1EFE8; }
        .result-meta { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 1rem; }
        .book-info { flex: 1; }
        .book-title { font-family: 'EB Garamond', serif; font-size: 20px; font-weight: 500; margin-bottom: 4px; }
        .book-author { font-size: 13px; color: #888780; margin-bottom: 8px; }
        .category-pill { font-size: 12px; padding: 3px 10px; border-radius: 20px; font-weight: 500; }
        .result-right { display: flex; flex-direction: column; align-items: center; gap: 8px; flex-shrink: 0; }
        .score-box { text-align: center; }
        .score-num { font-family: 'EB Garamond', serif; font-size: 40px; font-weight: 500; line-height: 1; }
        .score-denom { font-size: 12px; color: #888780; }
        .score-bar-track { height: 5px; background: #F1EFE8; border-radius: 3px; overflow: hidden; }
        .score-bar-fill { height: 100%; border-radius: 3px; transition: width .5s ease; }
        .score-legend { display: flex; justify-content: space-between; font-size: 10px; color: #B4B2A9; margin-top: 4px; }
        .result-body { padding: 1.25rem; }
        .section-label { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: .07em; color: #B4B2A9; margin-bottom: 6px; }
        .analysis-text { font-size: 14px; color: #5F5E5A; line-height: 1.65; margin-bottom: 1.1rem; }
        .tags-row { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 1.1rem; }
        .tag { font-size: 12px; padding: 3px 9px; border: 0.5px solid #D3D1C7; border-radius: 20px; color: #888780; }
        .ref-row { display: flex; gap: 6px; font-size: 12px; padding-top: 1rem; border-top: 0.5px solid #F1EFE8; margin-bottom: .5rem; }
        .ref-label { font-weight: 500; color: #888780; flex-shrink: 0; }
        .ref-text { color: #B4B2A9; }
        .result-actions { display: flex; align-items: center; gap: 8px; margin-top: .75rem; flex-wrap: wrap; }
        .amazon-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 16px;
          background: #FAF8F4; border: 0.5px solid #D3D1C7;
          border-radius: 8px; font-size: 13px; color: #5F5E5A;
          text-decoration: none; transition: all .15s;
        }
        .amazon-btn:hover { border-color: #888780; color: #2C2C2A; }
        .save-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px;
          background: #FFF0F2; border: 0.5px solid #e8788a;
          border-radius: 8px; font-size: 13px; color: #c95b6e;
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .15s;
        }
        .save-btn:hover { background: #ffe0e5; }

        /* ── NOT FOUND MEJORADO ── */
        .not-found {
          background: #fff; border: 0.5px solid #D3D1C7;
          border-radius: 14px; padding: 2rem 1.5rem;
        }
        .nf-icon { font-size: 28px; margin-bottom: 12px; text-align: center; }
        .nf-title { font-family: 'EB Garamond', serif; font-size: 20px; font-weight: 500; margin-bottom: 8px; text-align: center; }
        .nf-text { font-size: 13px; color: #888780; line-height: 1.6; margin-bottom: 1.25rem; text-align: center; }
        .nf-suggestions { margin-bottom: 1.25rem; }
        .nf-suggestions-label { font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: .06em; color: #B4B2A9; margin-bottom: .6rem; }
        .nf-suggestions-grid { display: flex; flex-direction: column; gap: .4rem; }
        .nf-suggestion-card {
          display: flex; align-items: center; gap: 10px;
          padding: .6rem .8rem; border-radius: 8px;
          background: #FAF8F4; border: 0.5px solid #E8E6DE;
          cursor: pointer; text-align: left; width: 100%;
          font-family: 'DM Sans', sans-serif; transition: border-color .15s;
        }
        .nf-suggestion-card:hover { border-color: #888780; }
        .nf-sug-score {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 600; flex-shrink: 0;
        }
        .nf-sug-info { flex: 1; min-width: 0; }
        .nf-sug-title { font-size: 13px; font-weight: 500; color: #2C2C2A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .nf-sug-author { font-size: 11px; color: #888780; }
        .nf-reset {
          display: block; margin: 0 auto;
          background: none; border: none;
          font-size: 13px; color: #888780; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: color .15s;
        }
        .nf-reset:hover { color: #2C2C2A; }

        /* ── STATS ── */
        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 1rem; margin-bottom: 2rem; }
        .stat-card { background: #fff; border: 0.5px solid #D3D1C7; border-radius: 10px; padding: .85rem; text-align: center; }
        .stat-num { font-family: 'EB Garamond', serif; font-size: 28px; font-weight: 500; color: #2C2C2A; }
        .stat-label { font-size: 11px; color: #888780; margin-top: 2px; }

        /* ── RECOMENDADOS ── */
        .rec-section { margin-top: 1rem; }
        .rec-title { font-family: 'EB Garamond', serif; font-size: 22px; font-weight: 500; margin-bottom: 1rem; }
        .rec-grid { display: flex; flex-direction: column; gap: .5rem; }
        .rec-card {
          display: flex; align-items: center; gap: 12px;
          background: #fff; border: 0.5px solid #D3D1C7;
          border-radius: 10px; padding: .75rem 1rem; cursor: pointer;
          transition: border-color .15s;
        }
        .rec-card:hover { border-color: #888780; }
        .rec-score {
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 500; flex-shrink: 0;
        }
        .rec-info { flex: 1; min-width: 0; }
        .rec-book-title { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .rec-author { font-size: 12px; color: #888780; }

        /* ── FOOTER ── */
        .footer { max-width: 680px; margin: 0 auto; width: 100%; padding: 1rem; }
        .disclaimer { font-size: 11px; color: #B4B2A9; line-height: 1.65; text-align: center; margin-bottom: 8px; }
        .footer-links { display: flex; justify-content: center; gap: 12px; font-size: 12px; }
        .footer-links a { color: #B4B2A9; text-decoration: none; }
        .footer-links a:hover { color: #888780; }
        .footer-links span { color: #D3D1C7; }

        @media (max-width: 768px) {
          .sidebar { display: none; }
          .mobile-header { display: flex; }
          .search-btn { padding: 0 14px; font-size: 13px; }
          .stats-row { gap: 6px; }
          .result-actions { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  );
}
