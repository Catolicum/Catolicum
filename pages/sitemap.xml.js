import { supabase } from "../lib/supabase";

function toSlug(str) {
  if (!str) return "";
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function getServerSideProps({ res }) {
  const base = "https://www.catolicum.com";

  const staticPages = [
    { url: base, priority: "1.0", changefreq: "weekly" },
    { url: base + "/recomendados", priority: "0.9", changefreq: "weekly" },
    { url: base + "/mision", priority: "0.8", changefreq: "monthly" },
    { url: base + "/acerca", priority: "0.7", changefreq: "monthly" },
    { url: base + "/contacto", priority: "0.6", changefreq: "monthly" },
    { url: base + "/privacidad", priority: "0.5", changefreq: "yearly" },
  ];

  const { data: libros } = await supabase
    .from("libros")
    .select("titulo")
    .eq("idioma", "es");

  const { data: recomendados } = await supabase
    .from("recomendados")
    .select("titulo");

  const seen = new Set();
  const bookPages = [];

  (libros || []).forEach(function(b) {
    const slug = toSlug(b.titulo);
    if (slug && !seen.has(slug)) {
      seen.add(slug);
      bookPages.push({ url: base + "/libro/" + slug, priority: "0.7", changefreq: "monthly" });
    }
  });

  const recomendadosPages = (recomendados || []).map(function(b) {
    return { url: base + "/recomendados/" + toSlug(b.titulo), priority: "0.8", changefreq: "monthly" };
  });

  const allPages = staticPages.concat(recomendadosPages).concat(bookPages);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(function(p) {
  return `  <url>
    <loc>${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`;
}).join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function SiteMap() {
  return null;
}