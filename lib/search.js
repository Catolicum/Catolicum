import { supabase } from './supabase';

function normalize(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export async function searchBook(query) {
  const term = normalize(query.trim());
  if (!term) return null;

  const { data, error } = await supabase
    .from('libros')
    .select('*')
    .ilike('titulo', '%' + query.trim() + '%')
    .eq('idioma', 'es')
    .limit(1);

  if (error || !data || data.length === 0) {console.log('DATOS:', JSON.stringify(data));
    const { data: data2, error: error2 } = await supabase
      .from('libros')
      .select('*')
      .ilike('autor', '%' + query.trim() + '%')
      .eq('idioma', 'es')
      .limit(1);

    if (error2 || !data2 || data2.length === 0) return null;
    return formatBook(data2[0]);
  }

  return formatBook(data[0]);
}

export async function getRecomendados() {
  const { data, error } = await supabase
    .from('libros')
    .select('*')
    .eq('idioma', 'es')
    .gte('puntuacion', '7')
    .order('puntuacion', { ascending: false })
    .limit(6);

  if (error || !data) return [];
  return data.map(formatBook);
}

export async function getAllSlugs() {
  const { data, error } = await supabase
    .from('libros')
    .select('titulo')
    .eq('idioma', 'es');

  if (error || !data) return [];
  return data.map(function(b) { return toSlug(b.titulo); });
}

export async function getBookBySlug(slug) {
  const { data, error } = await supabase
    .from('libros')
    .select('*')
    .eq('idioma', 'es');

  if (error || !data) return null;
  const book = data.find(function(b) { return toSlug(b.titulo) === slug; });
  if (!book) return null;
  return formatBook(book);
}

function toSlug(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function formatBook(b) {
  var punt = b.puntuacion;
  var score = 0;
  if (punt !== null && punt !== undefined && punt !== '') {
    score = Number(punt);
    if (isNaN(score)) score = 0;
  }
  return {
    t: b.titulo,
    a: b.autor,
    y: b.ano || b['año'] || '',
    s: score,
    cat: b.categoria,
    l: b.idioma,
    an: b.analisis || b['análisis'] || '',
    tags: b.tags ? b.tags.split('|') : [],
    ref: b.referencia
  };
}export async function getSuggestions(query) {
  var term = query.trim();
  if (!term || term.length < 2) return [];

  var { data, error } = await supabase
    .from('libros')
    .select('titulo, autor, puntuacion')
    .eq('idioma', 'es')
    .ilike('titulo', '%' + term + '%')
    .limit(5);

  if (!error && data && data.length > 0) return data;

  var { data: data2, error: error2 } = await supabase
    .from('libros')
    .select('titulo, autor, puntuacion')
    .eq('idioma', 'es')
    .ilike('autor', '%' + term + '%')
    .limit(5);

  if (!error2 && data2) return data2;
  return [];
}