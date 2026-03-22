# Catolicum

Análisis doctrinal de libros desde la perspectiva católica.

---

## Cómo poner en marcha el proyecto en tu ordenador

### Paso 1 — Descargar el proyecto

1. Abre **PowerShell** (búscalo en el menú inicio)
2. Escribe estos comandos uno a uno:

```
cd Desktop
mkdir catolicum
cd catolicum
```

### Paso 2 — Copiar los archivos

Copia todos los archivos que te ha dado Claude dentro de la carpeta `catolicum` que acabas de crear en el Escritorio. Respeta la estructura de carpetas:

```
catolicum/
  pages/
    _app.js
    index.js
  lib/
    books.js
  package.json
  next.config.js
  .gitignore
  README.md
```

### Paso 3 — Instalar dependencias

En PowerShell, dentro de la carpeta del proyecto:

```
npm install
```

Esto descargará todo lo necesario. Tarda 1-2 minutos.

### Paso 4 — Arrancar en tu ordenador

```
npm run dev
```

Abre tu navegador y ve a: **http://localhost:3000**

Verás Catolicum funcionando en tu ordenador.

---

## Cómo publicar en Vercel (internet)

### Paso 1 — Subir a GitHub

1. Ve a **github.com** y haz clic en "New repository"
2. Llámalo `catolicum`
3. Déjalo público
4. Haz clic en "Create repository"
5. GitHub te dará unos comandos. En PowerShell, dentro de tu carpeta del proyecto, ejecútalos:

```
git init
git add .
git commit -m "primer commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/catolicum.git
git push -u origin main
```

(Sustituye TU_USUARIO por tu nombre de usuario de GitHub)

### Paso 2 — Desplegar en Vercel

1. Ve a **vercel.com** y entra con tu cuenta
2. Haz clic en "Add New Project"
3. Selecciona el repositorio `catolicum`
4. Haz clic en "Deploy"
5. En 2 minutos tendrás tu web en: **https://www.catolicum.com**

---

## Cómo añadir Google AdSense (cuando te aprueben)

Cuando Google te apruebe AdSense, te dará un código parecido a este:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossorigin="anonymous"></script>
```

1. Abre el archivo `pages/index.js`
2. Busca los comentarios que dicen `{/* ADSENSE: reemplaza este div con tu código de AdSense */}`
3. Sustituye el `<div className="ad-placeholder">` por tu código de AdSense

---

## Cómo añadir más libros

Abre el archivo `lib/books.js` y añade un nuevo objeto al array siguiendo este formato:

```javascript
{
  t: "Título del libro",
  a: "Nombre del autor",
  y: "Año de publicación",
  s: 7,              // Puntuación del 1 al 10
  cat: "Ambiguo",    // Clásico católico / Crítico / Ambiguo
  l: "es",           // es = español, en = inglés
  an: "Análisis doctrinal del libro...",
  tags: ["tema1", "tema2", "tema3"],
  ref: "Fuente o referencia pública"
},
```

Guarda el archivo, haz commit y push a GitHub. Vercel lo desplegará automáticamente.

---

## Estructura del proyecto

```
pages/index.js   → La aplicación completa (búsqueda, resultados, diseño)
lib/books.js     → Base de datos de libros
```

---

## Próximos pasos

- [ ] Publicar en Vercel
- [ ] Solicitar Google AdSense
- [ ] Añadir más libros a la base de datos
- [ ] Conectar la Claude API para libros no encontrados (cuando haya fondos)
- [ ] Versión móvil con React Native
