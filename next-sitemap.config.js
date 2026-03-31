/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://catolicum.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/perfil", "/instalar"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/perfil", "/api"] },
    ],
    additionalSitemaps: [
      "https://catolicum.com/sitemap.xml",
    ],
  },
};
