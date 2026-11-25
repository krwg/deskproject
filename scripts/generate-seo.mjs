import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const manifestPath = path.join(root, 'src/data/sets.manifest.json')

const basePath = (process.env.VITE_BASE_PATH || '/').replace(/\/?$/, '/')
const siteUrl = (
  process.env.VITE_SITE_URL ||
  `https://krwg.github.io${basePath === '/' ? '' : basePath.replace(/\/$/, '')}`
).replace(/\/+$/, '')

const staticPaths = ['/', '/evolution', '/gallery', '/about']

function loadSetIds() {
  try {
    const raw = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    return Object.keys(raw.sets || {})
      .filter((id) => {
        const files = raw.sets[id]?.files
        return Array.isArray(files) && files.length > 0
      })
      .sort((a, b) => Number(a) - Number(b) || a.localeCompare(b))
  } catch {
    return []
  }
}

function loc(routePath) {
  if (routePath === '/') return `${siteUrl}/`
  return `${siteUrl}${routePath}`
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

if (!fs.existsSync(dist)) {
  console.error('dist/ missing — run vite build first')
  process.exit(1)
}

const setIds = loadSetIds()
const urls = [
  ...staticPaths,
  ...setIds.map((id) => `/gallery/${id}`),
]

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (p) => `  <url>
    <loc>${escapeXml(loc(p))}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
fs.writeFileSync(path.join(dist, 'robots.txt'), robots)
console.log(
  `SEO → dist/sitemap.xml (${urls.length} urls), dist/robots.txt @ ${siteUrl}`,
)
