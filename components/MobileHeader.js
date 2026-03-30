import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { signInWithGoogle } from "../lib/auth";
import { useInstallPWA } from "../hooks/useInstallPWA";

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
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [installing, setInstalling] = useState(false);
  const { canInstall, isInstalled, isIOS, triggerInstall } = useInstallPWA();

  useEffect(function() {
    supabase.auth.getSession().then(function(res) {
      setUser(res.data?.session?.user ?? null);
    });
    var sub = supabase.auth.onAuthStateChange(function(_e, session) {
      setUser(session?.user ?? null);
    });
    // Recuperar si el banner fue descartado
    var dismissed = localStorage.getItem("install_banner_dismissed");
    if (dismissed) setBannerDismissed(true);
    return function() { sub.data?.subscription?.unsubscribe(); };
  }, []);

  function dismissBanner() {
    setBannerDismissed(true);
    localStorage.setItem("install_banner_dismissed", "1");
  }

  async function handleInstall() {
    if (isIOS) return;
    setInstalling(true);
    await triggerInstall();
    setInstalling(false);
  }

  var avatarUrl = user?.user_metadata?.avatar_url;
  var userName = user?.user_metadata?.full_name || user?.user_metadata?.name || "";
  var showBanner = canInstall && !isInstalled && !bannerDismissed;

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

      {/* MENÚ DESPLEGABLE */}
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
          <Link href="/instalar" onClick={function() { setMenuOpen(false); }} style={{ display: "block", padding: "10px 0", fontSize: 14, fontFamily: "'EB Garamond', Georgia, serif", color: "#E1B955", textDecoration: "none", borderBottom: "0.5px solid #2A4E7F" }}>
            📲 Instalar app
          </Link>
          {user && (
            <Link href="/perfil" onClick={function() { setMenuOpen(false); }} style={{ display: "block", padding: "10px 0", fontSize: 14, fontFamily: "'EB Garamond', Georgia, serif", color: "#E1B955", textDecoration: "none" }}>
              ◎ Mi perfil
            </Link>
          )}
        </div>
      )}

      {/* BANNER INSTALACIÓN */}
      {showBanner && (
        <div style={{ background: "#162D4A", borderBottom: "0.5px solid #2A4E7F", padding: "8px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#1F3A5F", border: "0.5px solid #2A4E7F", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 64 64" fill="none">
              <rect width="64" height="64" rx="12" fill="#2A4E7F"/>
              <rect x="8" y="14" width="21" height="34" rx="3" fill="#16263F"/>
              <rect x="10" y="16" width="17" height="30" rx="2" fill="#8AAFD4"/>
              <rect x="30" y="14" width="21" height="34" rx="3" fill="#B8922A"/>
              <rect x="32" y="16" width="17" height="30" rx="2" fill="#F5E9C0"/>
              <rect x="28" y="12" width="4" height="38" rx="2" fill="#0F1E30"/>
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#FAF7F0", lineHeight: 1.3 }}>Instala Católicum</div>
            <div style={{ fontSize: 11, color: "#8AAFD4" }}>Accede más rápido desde tu móvil</div>
          </div>
          {isIOS ? (
            <Link href="/instalar" style={{ textDecoration: "none", flexShrink: 0 }}>
              <div style={{ padding: "5px 12px", background: "#E1B955", borderRadius: 6, fontSize: 12, fontWeight: 600, color: "#1F3A5F" }}>
                Cómo instalar
              </div>
            </Link>
          ) : (
            <button onClick={handleInstall} disabled={installing} style={{ padding: "5px 12px", background: "#E1B955", borderRadius: 6, fontSize: 12, fontWeight: 600, color: "#1F3A5F", border: "none", cursor: "pointer", flexShrink: 0, fontFamily: "DM Sans, sans-serif" }}>
              {installing ? "..." : "Instalar"}
            </button>
          )}
          <button onClick={dismissBanner} style={{ background: "none", border: "none", color: "#4A6A8A", fontSize: 16, cursor: "pointer", padding: 4, flexShrink: 0, lineHeight: 1 }}>✕</button>
        </div>
      )}
    </div>
  );
}
