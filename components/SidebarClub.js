import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { signInWithGoogle, signOut } from '../lib/auth';

const NAV = [
  { label: "Home", href: "/" },
  { label: "Club de lectura", href: "/club" },
  { label: "Libros recomendados", href: "/recomendados" },
  { label: "Misión", href: "/mision" },
  { label: "Contacto", href: "/contacto" },
];

const RATINGS = [
  { rango: "9-10", label: "Muy afín", color: "#1D9E75", bg: "#EAF3DE" },
  { rango: "7-8", label: "Favorable", color: "#639922", bg: "#EAF3DE" },
  { rango: "5-6", label: "Neutral", color: "#6E6E73", bg: "#F1EFE8" },
  { rango: "3-4", label: "Crítico", color: "#BA7517", bg: "#FAEEDA" },
  { rango: "1-2", label: "Contrario", color: "#A32D2D", bg: "#FCEBEB" },
];

function LogoIcon({ size = 36 }) {
  const rx = Math.round(size * 0.22);
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ flexShrink: 0 }}>
      <rect width="64" height="64" rx={rx} fill="#2A4E7F" />
      <rect x="8" y="14" width="21" height="34" rx="3" fill="#16263F" />
      <rect x="10" y="16" width="17" height="30" rx="2" fill="#8AAFD4" />
      <rect x="30" y="14" width="21" height="34" rx="3" fill="#B8922A" />
      <rect x="32" y="16" width="17" height="30" rx="2" fill="#F5E9C0" />
      <rect x="28" y="12" width="4" height="38" rx="2" fill="#0F1E30" />
      <rect x="39" y="21" width="3" height="16" rx="1" fill="#FAF7F0" />
      <rect x="33.5" y="27" width="14" height="3" rx="1" fill="#FAF7F0" />
    </svg>
  );
}

function WordmarkTitle() {
  return (
    <svg width="120" height="26" viewBox="0 0 220 48" style={{ display: "block" }}>
      <text x="0" y="38" fontFamily="'EB Garamond', Georgia, serif" fontSize="36" fill="#FAF7F0" fontWeight="400" letterSpacing="1">Ca</text>
      <rect x="67" y="8" width="4" height="32" rx="2" fill="#E1B955" />
      <rect x="57" y="16" width="22" height="4" rx="2" fill="#E1B955" />
      <text x="83" y="38" fontFamily="'EB Garamond', Georgia, serif" fontSize="36" fill="#FAF7F0" fontWeight="400" letterSpacing="1">olicum</text>
    </svg>
  );
}

export default function SidebarClub({ currentPath = "/" }) {
  const [session, setSession] = useState(null);
  const [numValoraciones, setNumValoraciones] = useState(0);
  const [showRatings, setShowRatings] = useState(false);

  useEffect(function() {
    supabase.auth.getSession().then(function(res) {
      setSession(res.data.session);
      if (res.data.session) {
        supabase
          .from('valoraciones')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', res.data.session.user.id)
          .then(function(r) { if (r.count) setNumValoraciones(r.count); });
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange(function(_, s) {
      setSession(s);
    });
    return function() { listener.subscription.unsubscribe(); };
  }, []);

  const userName = session?.user?.user_metadata?.full_name || session?.user?.user_metadata?.name || '';
  const userAvatar = session?.user?.user_metadata?.avatar_url || null;

  return (
    <aside style={{
      width: 220, flexShrink: 0,
      background: "#1F3A5F",
      borderRight: "0.5px solid #2A4E7F",
      display: "flex", flexDirection: "column",
      padding: "1.5rem 1rem",
      position: "sticky", top: 0, height: "100vh", overflowY: "auto"
    }}>

      {/* LOGO */}
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem", cursor: "pointer" }}>
          <LogoIcon size={36} />
          <div style={{ width: 1, height: 28, background: "#2A4E7F", flexShrink: 0 }} />
          <WordmarkTitle />
        </div>
      </Link>

      {/* USUARIO */}
      <div style={{ marginBottom: "1.25rem", padding: "0.75rem", background: "#162D4A", borderRadius: 10, border: "0.5px solid #2A4E7F" }}>
        {session ? (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              {userAvatar ? (
                <img src={userAvatar} alt="" style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0 }} />
              ) : (
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#2A4E7F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#FAF7F0", flexShrink: 0, fontWeight: 500 }}>
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#FAF7F0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userName}</div>
                <div style={{ fontSize: 10, color: "#8AAFD4" }}>Miembro del club</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 20, color: "#E1B955", lineHeight: 1 }}>{numValoraciones}</div>
                <div style={{ fontSize: 9, color: "#8AAFD4", textTransform: "uppercase", letterSpacing: ".05em" }}>valoraciones</div>
              </div>
              <button
                onClick={signOut}
                style={{ fontSize: 10, color: "#8AAFD4", background: "none", border: "0.5px solid #2A4E7F", borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}
              >
                Salir
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#8AAFD4", marginBottom: 8, lineHeight: 1.4 }}>
              Únete al club y valora tus libros
            </div>
            <button
              onClick={signInWithGoogle}
              style={{
                width: "100%", padding: "7px 0",
                background: "#FAF7F0", color: "#1F3A5F",
                border: "none", borderRadius: 8, fontSize: 12,
                fontWeight: 600, cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Entrar con Google
            </button>
          </div>
        )}
      </div>

      {/* NAV */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {NAV.map(function(item) {
          const active = currentPath === item.href;
          return (
            <Link key={item.href} href={item.href} style={{
              display: "flex", alignItems: "center",
              padding: "8px 10px", borderRadius: 8,
              fontSize: 13, fontFamily: "'EB Garamond', Georgia, serif",
              color: active ? "#FAF7F0" : "#8AAFD4",
              background: active ? "#2A4E7F" : "transparent",
              textDecoration: "none", transition: "all .15s"
            }}>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* CÓMO FUNCIONA */}
      <div style={{ marginTop: "1.25rem", padding: "0.75rem", background: "#162D4A", borderRadius: 10, border: "0.5px solid #2A4E7F" }}>
        <p style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".07em", color: "#8AAFD4", marginBottom: 8 }}>
          Cómo funciona
        </p>
        {[
          { icon: "🔍", texto: "Busca cualquier libro" },
          { icon: "📊", texto: "Ve nuestra puntuación católica" },
          { icon: "⭐", texto: "Añade la tuya y debate" },
        ].map(function(paso, i) {
          return (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 6 }}>
              <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>{paso.icon}</span>
              <span style={{ fontSize: 11, color: "#8AAFD4", lineHeight: 1.4 }}>{paso.texto}</span>
            </div>
          );
        })}
        <Link href="/club" style={{ display: "block", marginTop: 8, fontSize: 11, color: "#E1B955", textDecoration: "none", textAlign: "center" }}>
          Más sobre el club →
        </Link>
      </div>

      {/* ESCALA DE RATINGS */}
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={function() { setShowRatings(!showRatings); }}
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "none", border: "none", cursor: "pointer", padding: "4px 0",
            fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".07em", color: "#8AAFD4",
            fontFamily: "DM Sans, sans-serif"
          }}
        >
          <span>Escala de puntuación</span>
          <span style={{ fontSize: 10, color: "#3A5A7A" }}>{showRatings ? "▲" : "▼"}</span>
        </button>
        {showRatings && (
          <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 3 }}>
            {RATINGS.map(function(r) {
              return (
                <div key={r.rango} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 6px", background: r.bg, borderRadius: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: r.color, minWidth: 28 }}>{r.rango}</span>
                  <span style={{ fontSize: 10, color: r.color }}>{r.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "0.5px solid #2A4E7F", display: "flex", flexDirection: "column", gap: 4 }}>
        <Link href="/privacidad" style={{ fontSize: 10, color: "#3A5A7A", textDecoration: "none" }}>Privacidad</Link>
        <Link href="/acerca" style={{ fontSize: 10, color: "#3A5A7A", textDecoration: "none" }}>Acerca de</Link>
      </div>

    </aside>
  );
}
