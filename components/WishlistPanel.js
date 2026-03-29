// components/WishlistPanel.js
// Panel de wishlist para mostrar en el SidebarClub

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function getScoreStyle(s) {
  if (s >= 9) return { color: "#1D9E75", bg: "#EAF3DE", text: "#085041" };
  if (s >= 7) return { color: "#639922", bg: "#EAF3DE", text: "#27500A" };
  if (s >= 5) return { color: "#888780", bg: "#F1EFE8", text: "#444441" };
  if (s >= 3) return { color: "#BA7517", bg: "#FAEEDA", text: "#633806" };
  return { color: "#A32D2D", bg: "#FCEBEB", text: "#791F1F" };
}

export default function WishlistPanel({ user, refreshTrigger }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) { setItems([]); return; }
    setLoading(true);
    supabase
      .from("wishlist")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setItems(data || []);
        setLoading(false);
      });
  }, [user, refreshTrigger]);

  async function handleRemove(slug) {
    await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", user.id)
      .eq("libro_slug", slug);
    setItems((prev) => prev.filter((i) => i.libro_slug !== slug));
  }

  if (!user) {
    return (
      <div className="wl-empty-login">
        <div className="wl-icon">♡</div>
        <p className="wl-hint">Inicia sesión para guardar tu lista de lectura</p>
        <style jsx>{`
          .wl-empty-login { text-align: center; padding: 1rem 0; }
          .wl-icon { font-size: 22px; color: #C8C6BD; margin-bottom: 6px; }
          .wl-hint { font-size: 11px; color: #B4B2A9; line-height: 1.5; }
        `}</style>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: "0.75rem 0", textAlign: "center" }}>
        <span style={{ fontSize: 11, color: "#B4B2A9" }}>Cargando...</span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="wl-empty">
        <div className="wl-icon">♡</div>
        <p className="wl-hint">Aún no has guardado ningún libro. Pulsa el corazón en cualquier resultado.</p>
        <style jsx>{`
          .wl-empty { text-align: center; padding: .75rem 0; }
          .wl-icon { font-size: 22px; color: #C8C6BD; margin-bottom: 6px; }
          .wl-hint { font-size: 11px; color: #B4B2A9; line-height: 1.5; }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <div className="wl-list">
        {items.map((item) => {
          const st = getScoreStyle(item.libro_puntuacion);
          return (
            <div key={item.libro_slug} className="wl-item">
              <div
                className="wl-score"
                style={{ background: st.bg, color: st.text }}
              >
                {item.libro_puntuacion}
              </div>
              <div className="wl-info">
                <div className="wl-title">{item.libro_titulo}</div>
                <div className="wl-author">{item.libro_autor}</div>
              </div>
              <button
                className="wl-remove"
                onClick={() => handleRemove(item.libro_slug)}
                title="Quitar de la lista"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .wl-list { display: flex; flex-direction: column; gap: 5px; }
        .wl-item {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 8px; border-radius: 8px;
          background: rgba(255,255,255,0.06);
          border: 0.5px solid rgba(255,255,255,0.1);
        }
        .wl-score {
          width: 26px; height: 26px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 600; flex-shrink: 0;
        }
        .wl-info { flex: 1; min-width: 0; }
        .wl-title {
          font-size: 11px; font-weight: 500; color: #E8E4D8;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .wl-author { font-size: 10px; color: #8AAFD4; }
        .wl-remove {
          background: none; border: none; color: #6B7A8D;
          font-size: 10px; cursor: pointer; padding: 2px 4px;
          flex-shrink: 0; transition: color .15s;
        }
        .wl-remove:hover { color: #e8788a; }
      `}</style>
    </>
  );
}
