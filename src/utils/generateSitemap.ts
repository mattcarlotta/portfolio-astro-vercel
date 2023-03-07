const currentTime = new Date().toISOString()

export const HEADER = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`
export const FOOTER = '\n</urlset>'

export function generateSitemapUrl(slug: string) {
  return `<url><loc>${
    import.meta.env.DOMAIN
  }${slug}</loc><lastmod>${currentTime}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>`
}
