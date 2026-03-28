import { supabase } from './supabase';

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://catolicum.com' + (typeof window !== 'undefined' ? window.location.pathname : '/'),
    },
  });
  if (error) console.error('Error login Google:', error);
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Error logout:', error);
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getValoracion(libroSlug, userId) {
  const { data, error } = await supabase
    .from('valoraciones')
    .select('*')
    .eq('libro_slug', libroSlug)
    .eq('user_id', userId)
    .single();
  if (error) return null;
  return data;
}

export async function upsertValoracion(libroSlug, userId, puntuacion, comentario) {
  const { data, error } = await supabase
    .from('valoraciones')
    .upsert({
      libro_slug: libroSlug,
      user_id: userId,
      puntuacion: puntuacion,
      comentario: comentario,
      created_at: new Date().toISOString(),
    }, {
      onConflict: 'libro_slug,user_id',
    });
  if (error) throw error;
  return data;
}

export async function getEstadisticasValoraciones(libroSlug) {
  const { data, error } = await supabase
    .from('valoraciones')
    .select('puntuacion, comentario, created_at')
    .eq('libro_slug', libroSlug)
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) {
    return { media: null, total: 0, comentarios: [] };
  }

  const media = data.reduce((sum, v) => sum + v.puntuacion, 0) / data.length;
  const comentarios = data.filter(v => v.comentario && v.comentario.trim().length > 0);

  return {
    media: Math.round(media * 10) / 10,
    total: data.length,
    comentarios: comentarios.slice(0, 10),
  };
}