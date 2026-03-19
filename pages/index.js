import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { searchBook, getRecomendados } from "../lib/search";

function getScoreStyle(s) {
  if (s >= 9) return { color: "#1D9E75", bg: "#EAF3DE", text: "#085041", label: "Muy afin" };
  if (s >= 7) return { color: "#639922", bg: "#EAF3DE", text: "#27500A", label: "Favorable" };
  if (s >= 5) return { color: "#888780", bg: "#F1EFE8", text: "#444441", label: "Neutral" };
  if (s >= 3) return { color: "#BA7517", bg: "#FAEEDA", text: "#633806", label: "Critico" };
  return { color: "#A32D2D", bg: "#FCEBEB", text: "#791F1F", label: "Contrario" };
}

function toSlug(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const NAV = [
  { label: "Home", href: "/" },
  { label: "Mision", href: "/mision" },
  { label: "Libros recomendados", href: "/recomendados" },
  { label: "Contacto", href: "/contacto" },
];

const EXAMPLES = ["El Codigo Da Vinci", "Summa Theologica", "Harry Potter", "El Alquimista", "Sapiens"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [recommended, setRecommended] = useState([]);

  useEffect(function() {
    getRecomendados().then(function(data) {
      setRecommended(data);
    });
  }, []);

  async function handleSearch(q) {
    var term = q.trim();
    if (!term) return;
    setLoading(true);
    setSearched(true);
    var match = await searchBook(term);
    setResult(match);
    setLoading(false);
  }

  function handleKey(e) {
    if (e.key === "Enter") handleSearch(query);
  }

  var st = result ? getScoreStyle(result.s) : null;

  return (
    <div>
      <Head>
        <title>Catolicum - La Libreria Catolica</title>
        <meta name="description" content="Descubre si un libro es compatible con la fe catolica. Analisis doctrinal de mas de 300 libros basado en el Catecismo y fuentes publicas." />
        <meta name="keywords" content="libros catolicos, analisis doctrinal, fe catolica, libros recomendados catolicos, catecismo, doctrina catolica" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="DJgtQhrJpw86EiMeHjn-XjbOAYSsebWi-QaTPUl6dA8" />
        <meta property="og:title" content="Catolicum - La Libreria Catolica" />
        <meta property="og:description" content="Analisis doctrinal de libros desde la perspectiva catolica. Mas de 300 libros analizados." />
        <meta property="og:url" content="https://catolicum.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <link rel="canonical" href="https://catolicum.vercel.app" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8107872231396052" crossOrigin="anonymous"></script>
      </Head>

      <div className="layout">

        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-icon">✝</div>
            <div>
              <div className="logo-title">Catolicum</div>
              <div className="logo-tagline">La Libreria Catolica</div>
            </div>
          </div>
          <nav className="sidebar-nav">
            {NAV.map(function(item) {
              return (
                <Link key={item.href} href={item.href} className="nav-item">
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="sidebar-footer">
            <Link href="/privacidad" className="sidebar-link">Privacidad</Link>
            <Link href="/acerca" className="sidebar-link">Acerca de</Link>
          </div>
        </aside>

        <div className="mobile-header">
          <div className="mobile-logo">
            <div className="logo-icon-sm">✝</div>
            <span className="mobile-title">Catolicum</span>
          </div>
          <button className="burger" onClick={function() { setMenuOpen(!menuOpen); }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {NAV.map(function(item) {
              return (
                <Link key={item.href} href={item.href} className="mobile-nav-item" onClick={function() { setMenuOpen(false); }}>
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}

        <div className="content">

          <div className="ad-banner">
            <span className="ad-label">Publicidad</span>
            <div className="ad-placeholder">[ Google AdSense ]</div>
          </div>

          <main className="main">

            <div className="search-wrap">
              <div className="search-row">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Titulo del libro o nombre del autor..."
                  value={query}
                  onChange={function(e) { setQuery(e.target.value); }}
                  onKeyDown={handleKey}
                />
                <button className="search-btn" onClick={function() { handleSearch(query); }}>
                  Analizar
                </button>
              </div>
              <div className="examples-row">
                <span className="examples-label">Ejemplos:</span>
                {EXAMPLES.map(function(ex) {
                  return (
                    <button key={ex} className="chip" onClick={function() { setQuery(ex); handleSearch(ex); }}>
                      {ex}
                    </button>
                  );
                })}
              </div>
            </div>

            {loading && (
              <div className="loading-msg">Buscando...</div>
            )}

            {searched && !loading && (
              <div className="result-area">
                {result ? (
                  <div className="result-card">
                    <div className="result-header">
                      <div className="result-meta">
                        <div className="book-info">
                          <Link href={"/libro/" + toSlug(result.t)} style={{ textDecoration: "none", color: "inherit" }}>
                            <h2 className="book-title">{result.t}</h2>
                          </Link>
                          <p className="book-author">{result.a}{result.y ? " · " + result.y : ""}</p>
                          <span className="category-pill" style={{ background: st.bg, color: st.text }}>
                            {st.label}
                          </span>
                        </div>
                        <div className="score-box">
                          <div className="score-num" style={{ color: st.color }}>{result.s}</div>
                          <div className="score-denom">/10</div>
                        </div>
                      </div>
                      <div className="score-bar-wrap">
                        <div className="score-bar-track">
                          <div className="score-bar-fill" style={{ width: (result.s * 10) + "%", background: st.color }} />
                        </div>
                        <div className="score-legend">
                          <span>Contrario</span>
                          <span>Neutral</span>
                          <span>Afin</span>
                        </div>
                      </div>
                    </div>
                    <div className="result-body">
                      <p className="section-label">Analisis doctrinal</p>
                      <p className="analysis-text">{result.an}</p>
                      {result.tags && result.tags.length > 0 && (
                        <div>
                          <p className="section-label">Temas presentes</p>
                          <div className="tags-row">
                            {result.tags.map(function(tag) {
                              return (
                                <span key={tag} className="tag">{tag}</span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      <div className="ref-row">
                        <span className="ref-label">Referencia:</span>
                        <span className="ref-text">{result.ref}</span>
                      </div>
                      <a
                        className="amazon-btn"
                        href={"https://www.amazon.es/s?k=" + encodeURIComponent(result.t + " " + result.a) + "&tag=catolicum-21"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Encontrar en Amazon
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="not-found">
                    <div className="nf-icon">⏳</div>
                    <h3 className="nf-title">Libro en analisis</h3>
                    <p className="nf-text">Este libro aun no esta en nuestra base de datos. Estamos ampliando continuamente la coleccion.</p>
                    <p className="nf-retry">Vuelve a intentarlo mas tarde.</p>
                  </div>
                )}
              </div>
            )}

            {searched && !loading && (
              <div className="ad-banner ad-mid">
                <span className="ad-label">Publicidad</span>
                <div className="ad-placeholder">[ Google AdSense ]</div>
              </div>
            )}

            {!searched && (
              <div>
                <div className="rec-section">
                  <h2 className="rec-title">Recomendados para catolicos</h2>
                  <div className="rec-grid">
                    {recommended.map(function(b) {
                      var rs = getScoreStyle(b.s);
                      return (
                        <div key={b.t} className="rec-card" onClick={function() { setQuery(b.t); handleSearch(b.t); }}>
                          <div className="rec-score" style={{ background: rs.bg, color: rs.text }}>{b.s}</div>
                          <div className="rec-info">
                            <div className="rec-book-title">{b.t}</div>
                            <div className="rec-author">{b.a}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

          </main>

          <footer className="footer">
            <p className="disclaimer">
              Proyecto independiente, no afiliado a la Iglesia Catolica ni a ninguna institucion religiosa oficial.
              Las valoraciones se basan en analisis de fuentes publicas y no representan posiciones doctrinales oficiales.
            </p>
            <div className="footer-links">
              <Link href="/acerca">Acerca de</Link>
              <span>·</span>
              <Link href="/privacidad">Politica de Privacidad</Link>
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
        .layout { display: flex; min-height: 100vh; flex-direction: row; }
        .sidebar { width: 220px; flex-shrink: 0; background: #F1EFE8; border-right: 0.5px solid #D3D1C7; display: flex; flex-direction: column; padding: 1.5rem 1rem; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
        .sidebar-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 2rem; }
        .logo-icon { width: 36px; height: 36px; border-radius: 8px; background: #2C2C2A; color: #FAF8F4; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
        .logo-title { font-family: 'EB Garamond', serif; font-size: 20px; font-weight: 500; line-height: 1.1; }
        .logo-tagline { font-family: 'EB Garamond', serif; font-size: 12px; font-style: italic; color: #888780; margin-top: 2px; }
        .sidebar-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; }
        .nav-item { display: flex; align-items: center; padding: 8px 10px; border-radius: 8px; font-size: 15px; color: #5F5E5A; text-decoration: none; transition: all .15s; }
        .nav-item:hover { background: #E8E6DE; color: #2C2C2A; }
        .sidebar-footer { display: flex; flex-direction: column; gap: 4px; padding-top: 1rem; border-top: 0.5px solid #D3D1C7; }
        .sidebar-link { font-size: 11px; color: #B4B2A9; text-decoration: none; padding: 3px 0; }
        .sidebar-link:hover { color: #888780; }
        .mobile-header { display: none; align-items: center; justify-content: space-between; padding: .75rem 1rem; background: #F1EFE8; border-bottom: 0.5px solid #D3D1C7; position: sticky; top: 0; z-index: 10; width: 100%; }
        .mobile-logo { display: flex; align-items: center; gap: 8px; }
        .logo-icon-sm { width: 28px; height: 28px; border-radius: 6px; background: #2C2C2A; color: #FAF8F4; display: flex; align-items: center; justify-content: center; font-size: 13px; }
        .mobile-title { font-family: 'EB Garamond', serif; font-size: 20px; font-weight: 500; }
        .burger { background: none; border: none; font-size: 18px; cursor: pointer; color: #2C2C2A; }
        .mobile-menu { display: flex; flex-direction: column; background: #F1EFE8; border-bottom: 0.5px solid #D3D1C7; padding: .5rem 1rem 1rem; width: 100%; }
        .mobile-nav-item { padding: 10px 0; font-size: 14px; color: #2C2C2A; text-decoration: none; border-bottom: 0.5px solid #E8E6DE; }
        .content { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow-x: hidden; width: 100%; }
        .main { flex: 1; max-width: 680px; margin: 0 auto; width: 100%; padding: 2rem 1rem 1rem; }
        .ad-banner { width: 100%; background: #F1EFE8; border-bottom: 0.5px solid #D3D1C7; padding: 8px 16px; display: flex; align-items: center; gap: 12px; }
        .ad-mid { border-top: 0.5px solid #D3D1C7; border-bottom: 0.5px solid #D3D1C7; margin: 1.5rem 0; }
        .ad-label { font-size: 10px; color: #888780; text-transform: uppercase; letter-spacing: .06em; flex-shrink: 0; }
        .ad-placeholder { flex: 1; text-align: center; font-size: 12px; color: #B4B2A9; padding: 18px 0; border: 0.5px dashed #D3D1C7; border-radius: 6px; }
        .search-wrap { margin-bottom: 1.5rem; }
        .search-row { display: flex; gap: 8px; margin-bottom: .75rem; }
        .search-input { flex: 1; height: 48px; padding: 0 16px; border: 0.5px solid #D3D1C7; border-radius: 10px; background: #fff; color: #2C2C2A; font-size: 14px; font-family: 'DM Sans', sans-serif; transition: border-color .15s; }
        .search-input:focus { outline: none; border-color: #888780; }
        .search-btn { height: 48px; padding: 0 22px; background: #2C2C2A; color: #FAF8F4; border: none; border-radius: 10px; font-size: 14px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background .15s; white-space: nowrap; }
        .search-btn:hover { background: #444441; }
        .examples-row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
        .examples-label { font-size: 12px; color: #888780; }
        .chip { font-size: 12px; padding: 4px 12px; border: 0.5px solid #D3D1C7; border-radius: 20px; background: #fff; color: #5F5E5A; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .15s; }
        .chip:hover { border-color: #888780; color: #2C2C2A; }
        .loading-msg { text-align: center; padding: 2rem; font-size: 14px; color: #888780; }
        .result-area { margin-bottom: 1rem; }
        .result-card { background: #fff; border: 0.5px solid #D3D1C7; border-radius: 14px; overflow: hidden; }
        .result-header { padding: 1.25rem; border-bottom: 0.5px solid #F1EFE8; }
        .result-meta { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 1rem; }
        .book-info { flex: 1; }
        .book-title { font-family: 'EB Garamond', serif; font-size: 20px; font-weight: 500; margin-bottom: 4px; }
        .book-title:hover { text-decoration: underline; cursor: pointer; }
        .book-author { font-size: 13px; color: #888780; margin-bottom: 8px; }
        .category-pill { font-size: 12px; padding: 3px 10px; border-radius: 20px; font-weight: 500; }
        .score-box { text-align: center; flex-shrink: 0; }
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
        .amazon-btn { display: inline-flex; align-items: center; gap: 7px; margin-top: .75rem; padding: 8px 16px; background: #FAF8F4; border: 0.5px solid #D3D1C7; border-radius: 8px; font-size: 13px; color: #5F5E5A; text-decoration: none; transition: all .15s; }
        .amazon-btn:hover { border-color: #888780; color: #2C2C2A; }
        .not-found { background: #fff; border: 0.5px dashed #D3D1C7; border-radius: 14px; padding: 2.5rem 1.5rem; text-align: center; }
        .nf-icon { font-size: 28px; margin-bottom: 12px; }
        .nf-title { font-family: 'EB Garamond', serif; font-size: 20px; font-weight: 500; margin-bottom: 8px; }
        .nf-text { font-size: 13px; color: #888780; line-height: 1.6; margin-bottom: 6px; }
        .nf-retry { font-size: 13px; font-weight: 500; color: #5F5E5A; }
        .rec-section { margin-top: 1rem; }
        .rec-title { font-family: 'EB Garamond', serif; font-size: 22px; font-weight: 500; margin-bottom: 1rem; }
        .rec-grid { display: flex; flex-direction: column; gap: .5rem; }
        .rec-card { display: flex; align-items: center; gap: 12px; background: #fff; border: 0.5px solid #D3D1C7; border-radius: 10px; padding: .75rem 1rem; cursor: pointer; transition: border-color .15s; }
        .rec-card:hover { border-color: #888780; }
        .rec-score { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 500; flex-shrink: 0; }
        .rec-info { flex: 1; min-width: 0; }
        .rec-book-title { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .rec-author { font-size: 12px; color: #888780; }
        .footer { max-width: 680px; margin: 0 auto; width: 100%; padding: 1rem; }
        .disclaimer { font-size: 11px; color: #B4B2A9; line-height: 1.65; text-align: center; margin-bottom: 8px; }
        .footer-links { display: flex; justify-content: center; gap: 12px; font-size: 12px; }
        .footer-links a { color: #B4B2A9; text-decoration: none; }
        .footer-links a:hover { color: #888780; }
        .footer-links span { color: #D3D1C7; }
        @media (max-width: 768px) {
          .sidebar { display: none; }
          .mobile-header { display: flex; }
          .layout { flex-direction: column; }
          .content { width: 100%; }
          .main { padding: 1rem; }
          .search-btn { padding: 0 14px; font-size: 13px; }
          .ad-banner { padding: 6px 10px; }
          .ad-placeholder { padding: 10px 0; }
        }
      `}</style>
    </div>
  );
}