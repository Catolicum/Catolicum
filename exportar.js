const { BOOKS } = require('./lib/books');

function esc(s) {
  return '"' + String(s || '').replace(/"/g, '""') + '"';
}

const header = 'titulo,autor,año,puntuación,categoría,idioma,análisis,tags,referencia';

const rows = BOOKS.map(function(b) {
  return [
    esc(b.t),
    esc(b.a),
    esc(b.y || ''),
    esc(String(b.s)),
    esc(b.cat),
    esc(b.l),
    esc(b.an),
    esc((b.tags || []).join('|')),
    esc(b.ref)
  ].join(',');
});

const csv = header + '\n' + rows.join('\n');
require('fs').writeFileSync('libros.csv', csv, 'utf8');
console.log('CSV creado con ' + BOOKS.length + ' libros');