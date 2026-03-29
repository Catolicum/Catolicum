import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { supabase } from "../lib/supabase";
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

const TABS = [
  { id: "wishlist", label: "Mi lista", icon: "♡" },
  { id: "valoraciones", label: "Mis valoraciones", icon: "★" },
  { id: "historial", label: "Historial", icon: "⊙" },
  { id: "datos", label: "Mi cuenta", icon: "◎" },
];

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("wishlist");
  const [wishlist, setWishlist] = useState([]);
  const [valoraciones, setValoraciones] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(function() {
    function checkMobile() { setIsMobile(window.innerWidth <= 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return function() { window.removeEventListener("resize", checkMobile); };
  }, []);

  useEffect(function() {
    supabase.auth.getSession().then(function(res) {
      setUser(res.data?.session?.user ?? null);
      setLoading(false);
    });
    var sub = supabase.auth.onAuthStateChange(function(_e, session) {
      setUser(session?.user ?? null);
    });
    return function() { sub.data?.subscription?.unsubscribe(); };
  }, []);

  useEffect(function() {
    if (!user) return;

    supabase.from("wishlist").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).then(function(res) {
      setWishlist(res.data || []);
    });

    supabase.from("valoraciones").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).then(function(res) {
      setValoraciones(res.data || []);
    });

    supabase.from("search_history").select("*").eq("user_id", user.id).order("searched_at", { ascending: false }).limit(30).then(function(res) {
      setHistorial(res.data || []);
    });
  }, [user]);

  async function removeFromWishlist(slug) {
    await supabase.from("wishlist").delete().eq("user_id", user.id).eq("libro_slug", slug);
    setWishlist(function(prev) { return prev.filter(function(i) { return i.libro_slug !== slug; }); });
  }

  async function clearHistorial() {
    await supabase.from("search_history").delete().eq("user_id", user.id);
    setHistorial([]);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#FAF7F0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "DM Sans, sans-serif" }}>
        <p style={{ color: "#6E6E73", fontSize: 14 }}>Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", background: "#FAF7F0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "DM Sans, sans-serif", padding: "1rem" }}>
        <Head><title>Mi perfil - Catolicum</title></Head>
        <div style={{ textAlign: "center", maxWidth: 340 }}>
          <div style={{ fontSize: 40, marginBottom: "1rem" }}>◎</div>
          <h2 style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 26, color: "#1F3A5F", marginBottom: ".5rem" }}>Tu perfil</h2>
          <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.6, marginBottom: "1.5rem" }}>Inicia sesión para ver tu lista de lectura, valoraciones e historial.</p>
          <button onClick={signInWithGoogle} style={{ width: "100%", padding: "12px", background: "#1F3A5F", color: "#FAF7F0", border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
            Continuar con Google
          </button>
          <Link href="/" style={{ display: "block", marginTop: "1rem", fontSize: 13, color: "#8AAFD4", textDecoration: "none" }}>← Volver</Link>
        </div>
      </div>
    );
  }

  var avatarUrl = user.user_metadata?.avatar_url;
  var nombre = user.user_metadata?.full_name || user.email;

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F0", fontFamily: "DM Sans, sans-serif", color: "#1F2937" }}>
      <Head>
        <title>Mi perfil - Catolicum</title>
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      {/* HEADER */}
      <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: isMobile ? "10px 16px" : "12px 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 19, fontWeight: 500, color: "#FAF7F0", textDecoration: "none" }}>
          Catolicum
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {avatarUrl && <img src={avatarUrl} alt="avatar" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />}
          <span style={{ fontSize: 13, color: "#8AAFD4" }}>{nombre}</span>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "1.25rem 1rem" : "2rem 1.5rem" }}>

        {/* PERFIL CARD */}
        <div style={{ background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 14, padding: "1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 16 }}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="avatar" style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          ) : (
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#EDF2F8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#1F3A5F", flexShrink: 0 }}>
              {nombre?.[0]?.toUpperCase()}
            </div>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 20, fontWeight: 500, color: "#1F3A5F" }}>{nombre}</div>
            <div style={{ fontSize: 12, color: "#6E6E73", marginTop: 2 }}>{user.email}</div>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <span style={{ fontSize: 11, color: "#8AAFD4" }}>♡ {wishlist.length} guardados</span>
              <span style={{ fontSize: 11, color: "#8AAFD4" }}>★ {valoraciones.length} valoraciones</span>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: 4, marginBottom: "1.25rem", overflowX: "auto", paddingBottom: 2 }}>
          {TABS.map(function(t) {
            return (
              <button key={t.id} onClick={function() { setTab(t.id); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 20, border: "0.5px solid " + (tab === t.id ? "#1F3A5F" : "#D8D0BC"), background: tab === t.id ? "#1F3A5F" : "#fff", color: tab === t.id ? "#FAF7F0" : "#6E6E73", fontSize: 12, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "DM Sans, sans-serif" }}>
                <span>{t.icon}</span>{t.label}
              </button>
            );
          })}
        </div>

        {/* TAB: WISHLIST */}
        {tab === "wishlist" && (
          <div>
            {wishlist.length === 0 ? (
              <div style={{ textAlign: "center", padding: "2.5rem 1rem", background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 14 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>♡</div>
                <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 18, color: "#1F3A5F", marginBottom: 6 }}>Tu lista está vacía</p>
                <p style={{ fontSize: 13, color: "#6E6E73" }}>Guarda libros pulsando el corazón en cualquier resultado.</p>
                <Link href="/" style={{ display: "inline-block", marginTop: "1rem", fontSize: 13, color: "#E1B955", textDecoration: "none" }}>Buscar libros →</Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {wishlist.map(function(item) {
                  var st = getScoreStyle(item.libro_puntuacion);
                  return (
                    <div key={item.libro_slug} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 10, padding: ".75rem 1rem" }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: st.bg, color: st.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>{item.libro_puntuacion}</div>
                      <Link href={"/libro/" + item.libro_slug} style={{ flex: 1, minWidth: 0, textDecoration: "none", color: "inherit" }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "#1F3A5F", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.libro_titulo}</div>
                        <div style={{ fontSize: 11, color: "#6E6E73" }}>{item.libro_autor}</div>
                      </Link>
                      <button onClick={function() { removeFromWishlist(item.libro_slug); }} style={{ background: "none", border: "none", color: "#AEAEB2", fontSize: 14, cursor: "pointer", padding: "4px", flexShrink: 0 }} title="Quitar">✕</button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB: VALORACIONES */}
        {tab === "valoraciones" && (
          <div>
            {valoraciones.length === 0 ? (
              <div style={{ textAlign: "center", padding: "2.5rem 1rem", background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 14 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>★</div>
                <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 18, color: "#1F3A5F", marginBottom: 6 }}>Aún no has valorado ningún libro</p>
                <p style={{ fontSize: 13, color: "#6E6E73" }}>Busca un libro y deja tu opinión como miembro del club.</p>
                <Link href="/" style={{ display: "inline-block", marginTop: "1rem", fontSize: 13, color: "#E1B955", textDecoration: "none" }}>Buscar libros →</Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {valoraciones.map(function(v) {
                  var st = getScoreStyle(v.puntuacion);
                  return (
                    <div key={v.id} style={{ background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 10, padding: ".85rem 1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: v.comentario ? 8 : 0 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: st.bg, color: st.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{v.puntuacion}</div>
                        <Link href={"/libro/" + v.libro_slug} style={{ flex: 1, textDecoration: "none", color: "inherit" }}>
                          <div style={{ fontSize: 13, fontWeight: 500, color: "#1F3A5F" }}>{v.libro_slug.replace(/-/g, " ")}</div>
                        </Link>
                        <span style={{ fontSize: 10, color: "#AEAEB2", flexShrink: 0 }}>{new Date(v.created_at).toLocaleDateString("es-ES")}</span>
                      </div>
                      {v.comentario && (
                        <p style={{ fontSize: 12, color: "#6E6E73", lineHeight: 1.5, paddingLeft: 42, fontStyle: "italic" }}>"{v.comentario}"</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB: HISTORIAL */}
        {tab === "historial" && (
          <div>
            {historial.length === 0 ? (
              <div style={{ textAlign: "center", padding: "2.5rem 1rem", background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 14 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>⊙</div>
                <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 18, color: "#1F3A5F", marginBottom: 6 }}>Sin historial todavía</p>
                <p style={{ fontSize: 13, color: "#6E6E73" }}>Los libros que encuentres aparecerán aquí.</p>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: ".75rem" }}>
                  <button onClick={clearHistorial} style={{ fontSize: 12, color: "#AEAEB2", background: "none", border: "none", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>Borrar historial</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {historial.map(function(item) {
                    var st = getScoreStyle(item.libro_puntuacion);
                    return (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 10, padding: ".75rem 1rem" }}>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: st.bg, color: st.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{item.libro_puntuacion}</div>
                        <Link href={"/libro/" + item.libro_slug} style={{ flex: 1, minWidth: 0, textDecoration: "none", color: "inherit" }}>
                          <div style={{ fontSize: 13, fontWeight: 500, color: "#1F3A5F", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.libro_titulo}</div>
                          <div style={{ fontSize: 11, color: "#6E6E73" }}>{item.libro_autor}</div>
                        </Link>
                        <span style={{ fontSize: 10, color: "#AEAEB2", flexShrink: 0 }}>{new Date(item.searched_at).toLocaleDateString("es-ES")}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: DATOS */}
        {tab === "datos" && (
          <div style={{ background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ padding: "1.25rem", borderBottom: "0.5px solid #EDF2F8" }}>
              <p style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#AEAEB2", marginBottom: "1rem" }}>Mi cuenta</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#AEAEB2", marginBottom: 3 }}>Nombre</div>
                  <div style={{ fontSize: 14, color: "#1F2937" }}>{nombre}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#AEAEB2", marginBottom: 3 }}>Email</div>
                  <div style={{ fontSize: 14, color: "#1F2937" }}>{user.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#AEAEB2", marginBottom: 3 }}>Proveedor</div>
                  <div style={{ fontSize: 14, color: "#1F2937" }}>Google</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#AEAEB2", marginBottom: 3 }}>Miembro desde</div>
                  <div style={{ fontSize: 14, color: "#1F2937" }}>{new Date(user.created_at).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</div>
                </div>
              </div>
            </div>
            <div style={{ padding: "1rem 1.25rem" }}>
              <button onClick={handleSignOut} style={{ width: "100%", padding: "10px", background: "#fff", border: "0.5px solid #C8D4E0", borderRadius: 8, fontSize: 13, color: "#A32D2D", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
                Cerrar sesión
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}