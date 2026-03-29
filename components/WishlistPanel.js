import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

function getScoreStyle(s) {
  if (s >= 9) return { bg: "#EAF3DE", text: "#085041" };
  if (s >= 7) return { bg: "#EAF3DE", text: "#27500A" };
  if (s >= 5) return { bg: "#F5F5F7", text: "#3A3A3C" };
  if (s >= 3) return { bg: "#FAEEDA", text: "#633806" };
  return { bg: "#FCEBEB", text: "#791F1F" };
}

export default function WishlistPanel({ userId, onClose, onRemove }) {
  var [items, setItems] = useState([]);
  var [loading, setLoading] = useState(true);

  useEffect(function() {
    if (!userId) { setLoading(false); return; }
    supabase.from('wishlist').select('*').eq('user_id', userId).then(function(res) {
      if (res.data) setItems(res.data);
      setLoading(false);
    });
  }, [userId]);

  async function handleRemove(slug) {
    await supabase.from('wishlist').delete().eq('user_id', userId).eq('libro_slug', slug);
    setItems(function(prev) { return prev.filter(function(i) { return i.libro_slug !== slug; }); });
    if (onRemove) onRemove(slug);
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.35)' }} />
      <div style={{ position: 'relative', background: '#FAF7F0', borderRadius: '16px 16px 0 0', width: '100%', maxWidth: 520, maxHeight: '75vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '0.5px solid #E8E2D4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <p style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.07em', color: '#1F3A5F' }}>Mi lista de lectura</p>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#8AAFD4', padding: 0, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ overflowY: 'auto', flex: 1, padding: '0 1.25rem' }}>
          {loading && <p style={{ fontSize: 13, color: '#6E6E73', textAlign: 'center', padding: '1.5rem 0' }}>Cargando...</p>}
          {!loading && items.length === 0 && (
            <p style={{ fontSize: 13, color: '#8AAFD4', textAlign: 'center', fontStyle: 'italic', padding: '2rem 0' }}>
              Tu lista está vacía. Añade libros con el corazón ♥
            </p>
          )}
          {!loading && items.map(function(item) {
            var sc = getScoreStyle(item.libro_puntuacion);
            return (
              <div key={item.libro_slug} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '.85rem 0', borderBottom: '0.5px solid #E8E2D4' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#1F3A5F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.libro_titulo}</div>
                  <div style={{ fontSize: 12, color: '#6E6E73', marginTop: 2 }}>{item.libro_autor}</div>
                </div>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: sc.bg, color: sc.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500, flexShrink: 0 }}>{item.libro_puntuacion}</div>
                <button onClick={function() { handleRemove(item.libro_slug); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#AEAEB2', fontSize: 20, padding: '0 0 0 4px', lineHeight: 1, flexShrink: 0 }}>×</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
