import { useState, useEffect } from "react";
import Head from "next/head";
import { BOOKS } from "../lib/books";

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

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [lang, setLang] = useState("es");

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
  }

  function handleKey(e) {
    if (e.key === "Enter") handleSearch(query);
  }

  const examples = lang === "es"
    ? ["El Código Da Vinci", "Summa Theologica", "Harry Potter", "El Alquimista", "Sapiens"]
    : ["The Da Vinci Code", "Lord of the Rings", "Harry Potter", "The God Delusion", "Sapiens"];

  const st = result ? getScoreStyle(result.s) : null;

  return (
    <>
      <Head>
        <title>Catolicum — Análisis doctrinal de libros</title>
        <meta name="description" content="Descubre si un libro es compatible con la fe católica. Análisis doctrinal basado en fuentes públicas." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8107872231396052" crossorigin="anonymous"></script>
      </Head>

      <div className="page">
        {/* AD BANNER TOP */}
        <div className="ad-banner ad-top">
          <span className="ad-label">Publicidad</span>
          {/* ADSENSE: reemplaza este div con tu código de AdSense */}
          <div className="ad-placeholder">[ Espacio publicitario — Google AdSense ]</div>
        </div>

        <main className="main">
          {/* HEADER */}
          <header className="header">
            <div className="logo-wrap">
              <div className="logo-icon">✝</div>
              <div>
                <h1 className="logo-title">Catolicum</h1>
                <p className="logo-sub">Análisis doctrinal de libros</p>
              </div>
            </div>
          </header>

          {/* LANG TOGGLE */}
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

          {/* SEARCH */}
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
                <button
                  key={ex}
                  className="chip"
                  onClick={() => { setQuery(ex); handleSearch(ex); }}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* RESULT */}
          {searched && (
            <div className="result-area">
              {result ? (
                <div className="result-card">
                  <div className="result-header">
                    <div className="result-meta">
                      <div className="book-info">
                        <h2 className="book-title">{result.t}</h2>
                        <p className="book-author">{result.a}{result.y ? ` · ${result.y}` : ""}</p>
                        <span
                          className="category-pill"
                          style={{ background: st.bg, color: st.text }}
                        >
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
                        <div
                          className="score-bar-fill"
                          style={{ width: `${result.s * 10}%`, background: st.color }}
                        />
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
                  </div>
                </div>
              ) : (
                <div className="not-found">
                  <div className="nf-icon">⏳</div>
                  <h3 className="nf-title">
                    {lang === "es" ? "Libro en análisis" : "Book under analysis"}
                  </h3>
                  <p className="nf-text">
                    {lang === "es"
                      ? "Este libro aún no está en nuestra base de datos. Estamos ampliando continuamente la colección."
                      : "This book is not yet in our database. We are continuously expanding our collection."}
                  </p>
                  <p className="nf-retry">
                    {lang === "es" ? "Vuelve a intentarlo más tarde." : "Please try again later."}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* AD MIDDLE — solo se muestra tras búsqueda */}
          {searched && (
            <div className="ad-banner ad-mid">
              <span className="ad-label">Publicidad</span>
              {/* ADSENSE: reemplaza con tu código */}
              <div className="ad-placeholder">[ Espacio publicitario — Google AdSense ]</div>
            </div>
          )}

          {/* STATS */}
          {!searched && (
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-num">{BOOKS.filter(b => b.l === lang).length}</div>
                <div className="stat-label">{lang === "es" ? "libros analizados" : "books analysed"}</div>
              </div>
              <div className="stat-card">
                <div className="stat-num" style={{ color: "#1D9E75" }}>
                  {BOOKS.filter(b => b.l === lang && b.s >= 7).length}
                </div>
                <div className="stat-label">{lang === "es" ? "favorables" : "aligned"}</div>
              </div>
              <div className="stat-card">
                <div className="stat-num" style={{ color: "#A32D2D" }}>
                  {BOOKS.filter(b => b.l === lang && b.s <= 3).length}
                </div>
                <div className="stat-label">{lang === "es" ? "contrarios" : "against"}</div>
              </div>
            </div>
          )}
        </main>

        {/* DISCLAIMER */}
        <footer className="footer">
          <p className="disclaimer">
            Proyecto independiente, no afiliado a la Iglesia Católica ni a ninguna institución religiosa oficial.
            Las valoraciones se basan en análisis de fuentes públicas y no representan posiciones doctrinales oficiales.
            El objetivo es orientar a lectores católicos, no emitir juicios definitivos.
          </p>
        </footer>

        {/* AD BANNER BOTTOM */}
        <div className="ad-banner ad-bottom">
          <span className="ad-label">Publicidad</span>
          {/* ADSENSE: reemplaza con tu código */}
          <div className="ad-placeholder">[ Espacio publicitario — Google AdSense ]</div>
        </div>
      </div>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 16px; }
        body {
          font-family: 'DM Sans', sans-serif;
          background: #FAF8F4;
          color: #2C2C2A;
          min-height: 100vh;
        }
      `}</style>

      <style jsx>{`
        .page { display: flex; flex-direction: column; min-height: 100vh; }

        /* ADS */
        .ad-banner {
          width: 100%;
          background: #F1EFE8;
          border-bottom: 0.5px solid #D3D1C7;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ad-mid { border-top: 0.5px solid #D3D1C7; border-bottom: 0.5px solid #D3D1C7; margin: 1.5rem 0; }
        .ad-bottom { border-top: 0.5px solid #D3D1C7; border-bottom: none; margin-top: auto; }
        .ad-label { font-size: 10px; color: #888780; text-transform: uppercase; letter-spacing: .06em; flex-shrink: 0; }
        .ad-placeholder {
          flex: 1; text-align: center; font-size: 12px; color: #B4B2A9;
          padding: 18px 0; border: 0.5px dashed #D3D1C7; border-radius: 6px;
        }

        /* MAIN */
        .main { flex: 1; max-width: 680px; margin: 0 auto; width: 100%; padding: 2rem 1rem 1rem; }

        /* HEADER */
        .header { text-align: center; margin-bottom: 2rem; }
        .logo-wrap { display: inline-flex; align-items: center; gap: 14px; }
        .logo-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: #2C2C2A; color: #FAF8F4;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
        }
        .logo-title {
          font-family: 'EB Garamond', serif;
          font-size: 32px; font-weight: 500;
          color: #2C2C2A; text-align: left; line-height: 1.1;
        }
        .logo-sub { font-size: 13px; color: #888780; text-align: left; margin-top: 2px; }

        /* LANG */
        .lang-row { display: flex; gap: 6px; justify-content: center; margin-bottom: 1.5rem; }
        .lang-btn {
          padding: 5px 18px; border-radius: 20px; font-size: 13px;
          border: 0.5px solid #D3D1C7; background: #fff;
          color: #888780; cursor: pointer; transition: all .15s;
          font-family: 'DM Sans', sans-serif;
        }
        .lang-btn.active { background: #2C2C2A; color: #FAF8F4; border-color: #2C2C2A; }

        /* SEARCH */
        .search-wrap { margin-bottom: 1.5rem; }
        .search-row { display: flex; gap: 8px; margin-bottom: .75rem; }
        .search-input {
          flex: 1; height: 48px; padding: 0 16px;
          border: 0.5px solid #D3D1C7; border-radius: 10px;
          background: #fff; color: #2C2C2A; font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          transition: border-color .15s;
        }
        .search-input:focus { outline: none; border-color: #888780; }
        .search-btn {
          height: 48px; padding: 0 22px;
          background: #2C2C2A; color: #FAF8F4;
          border: none; border-radius: 10px; font-size: 14px;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background .15s; white-space: nowrap;
        }
        .search-btn:hover { background: #444441; }

        .examples-row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
        .examples-label { font-size: 12px; color: #888780; }
        .chip {
          font-size: 12px; padding: 4px 12px;
          border: 0.5px solid #D3D1C7; border-radius: 20px;
          background: #fff; color: #5F5E5A; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all .15s;
        }
        .chip:hover { border-color: #888780; color: #2C2C2A; }

        /* RESULT */
        .result-area { margin-bottom: 1rem; }
        .result-card {
          background: #fff; border: 0.5px solid #D3D1C7;
          border-radius: 14px; overflow: hidden;
        }
        .result-header { padding: 1.25rem; border-bottom: 0.5px solid #F1EFE8; }
        .result-meta { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 1rem; }
        .book-info { flex: 1; }
        .book-title { font-family: 'EB Garamond', serif; font-size: 20px; font-weight: 500; margin-bottom: 4px; }
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
        .ref-row { display: flex; gap: 6px; font-size: 12px; padding-top: 1rem; border-top: 0.5px solid #F1EFE8; }
        .ref-label { font-weight: 500; color: #888780; flex-shrink: 0; }
        .ref-text { color: #B4B2A9; }

        /* NOT FOUND */
        .not-found {
          background: #fff; border: 0.5px dashed #D3D1C7;
          border-radius: 14px; padding: 2.5rem 1.5rem; text-align: center;
        }
        .nf-icon { font-size: 28px; margin-bottom: 12px; }
        .nf-title { font-family: 'EB Garamond', serif; font-size: 20px; font-weight: 500; margin-bottom: 8px; }
        .nf-text { font-size: 13px; color: #888780; line-height: 1.6; margin-bottom: 6px; }
        .nf-retry { font-size: 13px; font-weight: 500; color: #5F5E5A; }

        /* STATS */
        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 1rem; }
        .stat-card { background: #fff; border: 0.5px solid #D3D1C7; border-radius: 10px; padding: .85rem; text-align: center; }
        .stat-num { font-family: 'EB Garamond', serif; font-size: 28px; font-weight: 500; color: #2C2C2A; }
        .stat-label { font-size: 11px; color: #888780; margin-top: 2px; }

        /* FOOTER */
        .footer { max-width: 680px; margin: 0 auto; width: 100%; padding: 1rem; }
        .disclaimer { font-size: 11px; color: #B4B2A9; line-height: 1.65; text-align: center; }

        @media (max-width: 480px) {
          .logo-title { font-size: 26px; }
          .search-btn { padding: 0 14px; font-size: 13px; }
          .stats-row { grid-template-columns: repeat(3, 1fr); gap: 6px; }
        }
      `}</style>
    </>
  );
}
