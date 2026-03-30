import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { signInWithGoogle } from "../lib/auth";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Club de lectura", href: "/club" },
  { label: "Libros recomendados", href: "/recomendados" },
  { label: "Misión", href: "/mision" },
  { label: "Contacto", href: "/contacto" },
];

export default function MobileHeader({ currentPath = "/" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(function() {
    supabase.auth.getSession().then(function(res) {
      setUser(res.data?.session?.user ?? null);
    });
    var sub = supabase.auth.onAuthStateChange(function(_e, session) {
      setUser(session?.user ?? null);
    });
    return function() { sub.data?.subscription?.unsubscribe(); };
  }, []);

  var avatarUrl = user?.user_metadata?.avatar_url;
  var userName = user?.user_metadata?.full_name || user?.user_metadata?.name || "";

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
      {/* HEADER */}
      <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 19, fontWeight: 500, color: "#FAF7F0" }}>Católicum</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {user ? (
            <Link href="/perfil" style={{ textDecoration: "none" }}>
              {avatarUrl ? (
                <img src={avatarUrl} alt="perfil" style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", display: "block", border: "1.5px solid #8AAFD4" }} />
              ) : (
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#2A4E7F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#FAF7F0", fontWeight: 600, border: "1.5px solid #8AAFD4" }}>
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
            </Link>
          ) : (
            <button onClick={signInWithGoogle} style={{ fontSize: 12, padding: "5px 10px", background: "rgba(255,255,255,0.1)", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 6, color: "#FAF7F0", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
              Entrar
            </button>
          )}
          <button onClick={function() { setMenuOpen(!menuOpen); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ display: "block", width: 18, height: 1.5, background: "#8AAFD4", borderRadius: 1 }} />
            <span style={{ display: "block", width: 18, height: 1.5, background: "#8AAFD4", borderRadius: 1 }} />
            <span style={{ display: "block", width: 18, height: 1.5, background: "#8AAFD4", borderRadius: 1 }} />
          </button>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE — dentro del sticky wrapper */}
      {menuOpen && (
        <div style={{ background: "#1F3A5F", borderBottom: "0.5px solid #2A4E7F", padding: ".5rem 1rem 1rem" }}>
          {NAV.map(function(item) {
            var active = currentPath === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={function() { setMenuOpen(false); }} style={{ display: "block", padding: "10px 0", fontSize: 14, fontFamily: "'EB Garamond', Georgia, serif", color: active ? "#FAF7F0" : "#8AAFD4", textDecoration: "none", borderBottom: "0.5px solid #2A4E7F", fontWeight: active ? 500 : 400 }}>
                {item.label}
              </Link>
            );
          })}
          {user && (
            <Link href="/perfil" onClick={function() { setMenuOpen(false); }} style={{ display: "block", padding: "10px 0", fontSize: 14, fontFamily: "'EB Garamond', Georgia, serif", color: "#E1B955", textDecoration: "none" }}>
              ◎ Mi perfil
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
