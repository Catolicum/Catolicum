import { supabase } from './supabase';

function normalize(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
}

export async function searchBook(query) {
  var term = normalize(query.trim());
  if (!term) return null;

  var { data, error } = await supabase
    .from('libros')
    .select('*')
    .ilike('titulo', '%' + query.trim() + '%')
    .eq('idioma', 'es')
    .limit(1);

  if (!error && data && data.length > 0) return formatBook(data[0]);

  var { data: data2, error: error2 } = await supabase
    .from('libros')
    .select('*')
    .ilike('autor', '%' + query.trim() + '%')
    .eq('idioma', 'es')
    .limit(1);

  if (!error2 && data2 && data2.length > 0) return formatBook(data2[0]);

  var { data: data3 } = await supabase
    .from('libros')
    .select('*')
    .eq('idioma', 'es');

  if (data3) {
    var match = data3.find(function(b) {
      var t = b.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      var a = b.autor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return t.includes(term) || a.includes(term);
    });
    if (match) return formatBook(match);
  }

  await registrarBusquedaNoEncontrada(query.trim());
  return null;
}

export async function getRecomendados() {
  var { data, error } = await supabase
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
  var { data, error } = await supabase
    .from('libros')
    .select('titulo')
    .eq('idioma', 'es');

  if (error || !data) return [];
  return data.map(function(b) { return toSlug(b.titulo); });
}

export async function getBookBySlug(slug) {
  var { data, error } = await supabase
    .from('libros')
    .select('*')
    .eq('idioma', 'es');

  if (error || !data) return null;
  var book = data.find(function(b) { return toSlug(b.titulo) === slug; });
  if (!book) return null;
  return formatBook(book);
}

export async function getSuggestions(query) {
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

export async function getRecomendadosRicos() {
  var { data, error } = await supabase
    .from('recomendados')
    .select('*')
    .order('puntuacion', { ascending: false });
  if (error || !data) return [];
  return data;
}

export async function getRecomendadoBySlug(slug) {
  var { data, error } = await supabase
    .from('recomendados')
    .select('*');
  if (error || !data) return null;
  return data.find(function(b) {
    return toSlug(b.titulo) === slug;
  }) || null;
}

export async function registrarBusquedaNoEncontrada(query) {
  try {
    var termLower = query.trim().toLowerCase();
    if (!termLower || termLower.length < 2) return;

    var { data } = await supabase
      .from('busquedas_no_encontradas')
      .select('id, veces')
      .ilike('query', termLower)
      .limit(1);

    if (data && data.length > 0) {
      await supabase
        .from('busquedas_no_encontradas')
        .update({
          veces: data[0].veces + 1,
          ultima_busqueda: new Date().toISOString()
        })
        .eq('id', data[0].id);
    } else {
      await supabase
        .from('busquedas_no_encontradas')
        .insert({
          query: termLower,
          veces: 1,
          ultima_busqueda: new Date().toISOString()
        });
    }
  } catch(e) {
    console.log('Error registrando busqueda:', e);
  }
}