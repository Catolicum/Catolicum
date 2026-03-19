import { BOOKS } from "../lib/books";

function generateSiteMap() {
  const baseUrl = "https://catolicum.vercel.app";
  const staticPages = [
    { url: "", priority: "1.0", changefreq: "weekly" },
    { url: "/mision", priority: "0.8", changefreq: "monthly" },
    { url: "/recomendados", priority: "0.9", changefreq: "weekly" },
    { url: "/acerca", priority: "0.7", changefreq: "monthly" },
    { url: "/contacto", priority: "0.6", changefreq: "monthly" },
    { url: "/privacidad", priority: "0.5", changefreq: "yearly" },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(({ url, priority, changefreq }) => `  <url>
    <loc>${baseUrl}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n")}
</urlset>`;
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return { props: {} };
}

export default SiteMap;