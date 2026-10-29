import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const { render, SITE_URL, services } = await import(pathToFileURL(ssrEntry).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')

const routes = ['/', '/about', '/services', ...services.map((s) => `/services/${s.slug}`), '/accessories', '/gallery', '/faq', '/contact']

function page(url) {
  const { html, head, htmlAttributes } = render(url)
  return template
    .replace(/<html[^>]*>/, `<html ${htmlAttributes}>`)
    .replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, head)
    .replace('<div id="root"></div>', `<div id="root" data-route="${url}">${html}</div>`)
}

for (const url of routes) {
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url, 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, page(url))
  console.log('prerendered', url)
}
fs.writeFileSync(path.join(dist, '404.html'), page('/404'))

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${r === '/' ? '1.0' : r.startsWith('/services/') ? '0.8' : '0.7'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`Done: ${routes.length} pages, sitemap.xml and robots.txt written to dist/`)
