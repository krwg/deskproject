#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const setsRoot = path.join(root, 'public', 'images', 'sets')
const manifestPath = path.join(root, 'src', 'data', 'sets.manifest.json')

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff'])
const VIDEO_EXT = new Set(['.mp4', '.webm', '.mov'])
const SKIP = new Set(['.gitkeep', 'readme.md', 'readme.txt'])

function isDerived(name) {
  const lower = name.toLowerCase()
  if (name.startsWith('.')) return true
  if (/-thumb\./i.test(name)) return true
  if (/-loop5\./i.test(name)) return true
  if (lower.endsWith('.tmp')) return true
  return false
}

function isMedia(name) {
  if (SKIP.has(name.toLowerCase()) || isDerived(name)) return false
  const ext = path.extname(name).toLowerCase()
  return IMAGE_EXT.has(ext) || VIDEO_EXT.has(ext)
}

async function listSetFolders() {
  const entries = await fs.readdir(setsRoot, { withFileTypes: true })
  return entries
    .filter((e) => e.isDirectory() && /^\d+$/.test(e.name))
    .map((e) => e.name)
    .sort((a, b) => Number(a) - Number(b))
}

async function folderHasMedia(folder) {
  const dir = path.join(setsRoot, folder)
  const names = await fs.readdir(dir)
  return names.some(isMedia)
}

async function main() {
  const raw = await fs.readFile(manifestPath, 'utf8')
  const manifest = JSON.parse(raw)
  const manifestSets = manifest.sets && typeof manifest.sets === 'object' ? manifest.sets : {}
  const manifestIds = new Set(Object.keys(manifestSets))

  const folders = await listSetFolders()
  const mediaFolders = []
  for (const folder of folders) {
    if (await folderHasMedia(folder)) mediaFolders.push(folder)
  }

  const errors = []

  for (const id of mediaFolders) {
    if (!manifestIds.has(id)) {
      errors.push(`set folder ${id}/ has media but is missing from sets.manifest.json`)
    }
  }

  for (const id of manifestIds) {
    const dir = path.join(setsRoot, id)
    try {
      await fs.access(dir)
    } catch {
      errors.push(`manifest lists set ${id} but public/images/sets/${id}/ is missing`)
      continue
    }

    const files = manifestSets[id]?.files
    if (!Array.isArray(files) || files.length === 0) {
      errors.push(`manifest set ${id} has no files[]`)
      continue
    }

    for (const file of files) {
      const rel = String(file.src || '').replace(/^\//, '')
      if (!rel.startsWith('images/sets/')) {
        errors.push(`set ${id}: unexpected src ${file.src}`)
        continue
      }
      const abs = path.join(root, 'public', rel)
      try {
        await fs.access(abs)
      } catch {
        errors.push(`set ${id}: missing file public/${rel}`)
      }
    }
  }

  if (errors.length) {
    console.error('Manifest drift detected:\n')
    for (const line of errors) console.error(`- ${line}`)
    console.error('\nFix: add/remove media, run `npm run images`, commit manifests.')
    process.exit(1)
  }

  console.log(
    `Manifest OK — ${mediaFolders.length} set folder(s) with media, ${manifestIds.size} in manifest.`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
