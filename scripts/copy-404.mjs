import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const index = path.join(dist, 'index.html')
const notFound = path.join(dist, '404.html')

if (!fs.existsSync(index)) {
  console.error('dist/index.html missing — run vite build first')
  process.exit(1)
}

fs.copyFileSync(index, notFound)
console.log('Copied index.html → 404.html for GitHub Pages SPA fallback')
