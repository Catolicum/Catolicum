import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { signInWithGoogle, signOut, getValoracion, upsertValoracion, getEstadisticasValoraciones } from '../lib/auth';

function StarRating({ value, onChange, readonly = false }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(n) {
        const filled = n <= (hovered || value);
        return (
          <button
            key={n}
            onClick={function() { if (!readonly && onChange) onChange(n); }}
            onMouseEnter={function() { if (!readonly) setHovered(n); }}
            onMouseLeave={function() { if (!readonly) setHovered(0); }}
            style={{
              width: 28, height: 28,
              borderRadius: '50%',
              border: filled ? 'none' : '0.5px solid #C8D4E0',
              background: filled ? '#1F3A5F' : '#EDF2F8',
              color: filled ? '#FAF7F0' : '#8AAFD4',
              fontSize: 11, fontWeight: 500,
              cursor: readonly ? 'default' : 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all .1s',
              padding: 0,
            }}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

export default function Valoracion({ libroSlug }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [puntuacion, setPuntuacion] = useState(0);
  const [comentario, setComentario] = useState('');
  const [miValoracion, setMiValoracion] = useState(null);
  const [stats, setStats] = useState({ media: null, total: 0, comentarios: [] });
  const [mensaje, setMensaje] = useState(null);
  const [modoEditar, setModoEditar] = useState(false);

  useEffect(function() {
    supabase.auth.getSession().then(function(res) {
      setSession(res.data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(function(event, session) {
      setSession(session);
    });

    getEstadisticasValoraciones(libroSlug).then(setStats);

    return function() { listener.subscription.unsubscribe(); };
  }, [libroSlug]);

  useEffect(function() {
    if (session && session.user) {
      getValoracion(libroSlug, session.user.id).then(function(v) {
        if (v) {
          setMiValoracion(v);
          setPuntuacion(v.puntuacion);
          setComentario(v.comentario || '');
        }
      });
    }
  }, [session, libroSlug]);

  async function handleEnviar() {
    if (!puntuacion) { setMensaje({ tipo: 'error', texto: 'Selecciona una puntuación' }); return; }
    setEnviando(true);
    try {
      await upsertValoracion(libroSlug, session.user.id, puntuacion, comentario);
      const nuevasStats = await getEstadisticasValoraciones(libroSlug);
      setStats(nuevasStats);
      setMiValoracion({ puntuacion, comentario });
      setModoEditar(false);
      setMensaje({ tipo: 'ok', texto: '¡Valoración guardada!' });
      setTimeout(function() { setMensaje(null); }, 3000);
    } catch (e) {
      setMensaje({ tipo: 'error', texto: 'Error al guardar. Inténtalo de nuevo.' });
    }
    setEnviando(false);
  }

  if (loading) return null;

  return (
    <div style={{ marginTop: '2rem' }}>

      {/* ESTADÍSTICAS */}
      <div style={{ background: '#1F3A5F', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
        <p style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.07em', color: '#8AAFD4', marginBottom: 12 }}>
          Opinión de la comunidad
        </p>
        {stats.total > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 40, fontWeight: 400, color: '#E1B955', lineHeight: 1 }}>
                {stats.media}
              </div>
              <div style={{ fontSize: 11, color: '#8AAFD4', marginTop: 2 }}>/10</div>
            </div>
            <div style={{ width: '0.5px', background: '#2A4E7F', alignSelf: 'stretch' }} />
            <div>
              <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 24, color: '#FAF7F0' }}>
                {stats.total}
              </div>
              <div style={{ fontSize: 11, color: '#8AAFD4' }}>
                {stats.total === 1 ? 'valoración' : 'valoraciones'}
              </div>
            </div>
          </div>
        ) : (
          <p style={{ fontSize: 13, color: '#8AAFD4', fontStyle: 'italic' }}>
            Sé el primero en valorar este libro
          </p>
        )}
      </div>

      {/* COMENTARIOS */}
      {stats.comentarios.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1rem' }}>
          {stats.comentarios.map(function(c, i) {
            return (
              <div key={i} style={{ background: '#fff', border: '0.5px solid #C8D4E0', borderRadius: 10, padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#EDF2F8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500, color: '#1F3A5F', flexShrink: 0 }}>
                    {c.puntuacion}
                  </div>
                  <span style={{ fontSize: 11, color: '#8AAFD4' }}>
                    {new Date(c.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: '#3A3A3C', lineHeight: 1.6, margin: 0 }}>{c.comentario}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* FORMULARIO */}
      <div style={{ background: '#FAF7F0', border: '0.5px solid #C8D4E0', borderRadius: 12, padding: '1.25rem' }}>
        <p style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.07em', color: '#8AAFD4', marginBottom: 12 }}>
          Tu valoración
        </p>

        {!session ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <p style={{ fontSize: 13, color: '#6E6E73', marginBottom: 12 }}>
              Inicia sesión para dejar tu valoración
            </p>
            <button
              onClick={signInWithGoogle}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '10px 20px', background: '#1F3A5F', color: '#FAF7F0',
                border: 'none', borderRadius: 10, fontSize: 14, cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continuar con Google
            </button>
          </div>
        ) : miValoracion && !modoEditar ? (
          <div>
            <p style={{ fontSize: 13, color: '#3A3A3C', marginBottom: 8 }}>Tu puntuación:</p>
            <StarRating value={miValoracion.puntuacion} readonly />
            {miValoracion.comentario && (
              <p style={{ fontSize: 13, color: '#6E6E73', marginTop: 8, fontStyle: 'italic' }}>
                "{miValoracion.comentario}"
              </p>
            )}
            <button
              onClick={function() { setModoEditar(true); }}
              style={{ marginTop: 12, fontSize: 12, padding: '5px 14px', border: '0.5px solid #C8D4E0', borderRadius: 20, background: '#EDF2F8', color: '#1F3A5F', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
            >
              Editar valoración
            </button>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 13, color: '#3A3A3C', marginBottom: 8 }}>Tu puntuación:</p>
            <StarRating value={puntuacion} onChange={setPuntuacion} />
            <textarea
              value={comentario}
              onChange={function(e) { setComentario(e.target.value); }}
              placeholder="Comparte tu opinión sobre este libro (opcional)..."
              rows={3}
              style={{
                width: '100%', marginTop: 12, padding: '10px 14px',
                border: '0.5px solid #C8D4E0', borderRadius: 8,
                fontSize: 13, fontFamily: 'DM Sans, sans-serif',
                color: '#1F2937', background: '#fff', resize: 'vertical',
              }}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 10, alignItems: 'center' }}>
              <button
                onClick={handleEnviar}
                disabled={enviando || !puntuacion}
                style={{
                  padding: '9px 20px', background: puntuacion ? '#1F3A5F' : '#C8D4E0',
                  color: '#FAF7F0', border: 'none', borderRadius: 8,
                  fontSize: 13, cursor: puntuacion ? 'pointer' : 'default',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
                }}
              >
                {enviando ? 'Guardando...' : 'Guardar valoración'}
              </button>
              <button
                onClick={signOut}
                style={{ fontSize: 12, color: '#8AAFD4', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
              >
                Cerrar sesión
              </button>
            </div>
            {mensaje && (
              <p style={{ marginTop: 8, fontSize: 12, color: mensaje.tipo === 'ok' ? '#1D9E75' : '#A32D2D' }}>
                {mensaje.texto}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}