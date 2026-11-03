#!/usr/bin/env node

import { execFile } from 'node:child_process'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'

const execFileAsync = promisify(execFile)

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const setsRoot = path.join(root, 'public', 'images', 'sets')
const homeRoot = path.join(root, 'public', 'images', 'home')
const manifestPath = path.join(root, 'src', 'data', 'sets.manifest.json')
const homeManifestPath = path.join(root, 'src', 'data', 'home.manifest.json')

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff'])
const VIDEO_EXT = new Set(['.mp4', '.webm', '.mov'])
const SKIP_NAMES = new Set(['.gitkeep', 'readme.md', 'readme.txt'])
const VIDEO_LOOP_SEC = 5

let sharp = null
try {
  sharp = (await import('sharp')).default
  await sharp({
    create: { width: 1, height: 1, channels: 3, background: '#000' },
  })
    .png()
    .toBuffer()
  console.log('sharp: ok (will write WebP + thumbs)')
} catch (err) {
  sharp = null
  console.warn(
    'sharp unavailable — using original files as-is.\n',
    String(err?.message || err).split('\n')[0],
  )
}

let hasFfmpeg = false
try {
  await execFileAsync('ffmpeg', ['-version'], { windowsHide: true })
  hasFfmpeg = true
  console.log('ffmpeg: ok (will trim videos to 5s loops)')
} catch {
  console.warn(
    'ffmpeg unavailable — videos keep originals; UI loops first 5s',
  )
}

function stem(file) {
  return path.basename(file, path.extname(file)).replace(/-thumb$/i, '')
}

function safeStem(file) {
  const raw = stem(file)
    .replace(/-loop5$/i, '')
  if (raw.toLowerCase() === 'main') return 'main'
  const cleaned = raw
    .replace(/\s+/g, '-')
    .replace(/[()[\]{}]/g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return cleaned || 'frame'
}

function isThumb(file) {
  return /-thumb\./i.test(file)
}

function isDerived(file) {
  const lower = file.toLowerCase()
  if (isThumb(file)) return true
  if (/-loop5\./i.test(file)) return true
  if (lower.endsWith('.tmp')) return true
  if (file.startsWith('.')) return true
  return false
}

function dateFromFilename(name) {
  
  let m = name.match(
    /(20\d{2})[-_.]?(\d{2})[-_.]?(\d{2})[_T\s-]+(\d{2})[-_.]?(\d{2})[-_.]?(\d{2})/,
  )
  if (m) {
    return `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}`
  }
  
  m = name.match(/(20\d{2})(\d{2})(\d{2})[_-](\d{2})(\d{2})(\d{2})/)
  if (m) {
    return `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}`
  }
  
  m = name.match(/(20\d{2})[-_.]?(\d{2})[-_.]?(\d{2})(?!\d)/)
  if (m) {
    return `${m[1]}-${m[2]}-${m[3]}`
  }
  return null
}

async function dateFromExif(filePath) {
  if (!sharp) return null
  try {
    const meta = await sharp(filePath, { failOn: 'none' }).metadata()
    if (!meta.exif) return null
    
    const ascii = Buffer.from(meta.exif).toString('latin1')
    const m = ascii.match(
      /(20\d{2}):(\d{2}):(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/,
    )
    if (!m) return null
    return `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}`
  } catch {
    return null
  }
}

async function dateFromMtime(filePath) {
  try {
    const st = await fs.stat(filePath)
    const d = st.birthtimeMs > 0 ? st.birthtime : st.mtime
    const iso = d.toISOString()
    return iso.slice(0, 19)
  } catch {
    return null
  }
}

async function resolveMediaDate(filePath, name) {
  return (
    dateFromFilename(name) ||
    (await dateFromExif(filePath)) ||
    (await dateFromMtime(filePath))
  )
}

function pickSetDate(files) {
  
  
  const fromNames = files
    .map((f) => dateFromFilename(f.name))
    .filter(Boolean)
    .sort()
  if (fromNames.length > 0) return fromNames[0]

  const dated = files
    .map((f) => f.date)
    .filter(Boolean)
    .sort()
  return dated[0] ?? null
}

async function listSetFolders() {
  try {
    const entries = await fs.readdir(setsRoot, { withFileTypes: true })
    return entries
      .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
      .map((e) => e.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  } catch {
    return []
  }
}

async function listRawFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => {
      const lower = name.toLowerCase()
      if (SKIP_NAMES.has(lower)) return false
      if (isDerived(name)) return false
      if (lower.endsWith('.avif')) return false
      if (lower.endsWith('.drop-here')) return false
      const ext = path.extname(lower)
      return IMAGE_EXT.has(ext) || VIDEO_EXT.has(ext)
    })
}

async function fileFresh(dest, source) {
  try {
    const [d, s] = await Promise.all([fs.stat(dest), fs.stat(source)])
    return d.size > 0 && d.mtimeMs >= s.mtimeMs
  } catch {
    return false
  }
}

async function replaceFile(tmp, dest) {
  try {
    await fs.rm(dest, { force: true })
  } catch {
    
  }
  try {
    await fs.rename(tmp, dest)
    return
  } catch {
    try {
      await fs.copyFile(tmp, dest)
    } finally {
      await fs.unlink(tmp).catch(() => {})
    }
  }
}

async function processStill(dir, publicSubdir, name) {
  const input = path.join(dir, name)
  const base = safeStem(name)
  const outWebp = path.join(dir, `${base}.webp`)
  const outThumb = path.join(dir, `${base}-thumb.webp`)
  const pub = `/images/${publicSubdir}`

  
  const inputIsOutput =
    path.resolve(input).toLowerCase() === path.resolve(outWebp).toLowerCase()

  if (!sharp || inputIsOutput) {
    const meta = sharp
      ? await sharp(input, { failOn: 'none' }).metadata().catch(() => ({}))
      : {}
    const thumbExists = await fs
      .access(outThumb)
      .then(() => true)
      .catch(() => false)
    const date = await resolveMediaDate(input, name)
    return {
      name: base,
      kind: 'image',
      src: `${pub}/${path.basename(input)}`,
      thumbnail: thumbExists
        ? `${pub}/${base}-thumb.webp`
        : `${pub}/${path.basename(input)}`,
      width: meta.width ?? null,
      height: meta.height ?? null,
      date,
    }
  }

  if (
    (await fileFresh(outWebp, input)) &&
    (await fileFresh(outThumb, input))
  ) {
    const outMeta = await sharp(outWebp).metadata()
    const date = await resolveMediaDate(input, name)
    return {
      name: base,
      kind: 'image',
      src: `${pub}/${base}.webp`,
      thumbnail: `${pub}/${base}-thumb.webp`,
      width: outMeta.width ?? null,
      height: outMeta.height ?? null,
      date,
    }
  }

  const stamp = `${process.pid}-${Date.now()}`
  const tmpFull = path.join(os.tmpdir(), `tdp-${base}-${stamp}.webp`)
  const tmpThumb = path.join(os.tmpdir(), `tdp-${base}-thumb-${stamp}.webp`)

  try {
    await sharp(input, { failOn: 'none' })
      .rotate()
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 78, effort: 4 })
      .toFile(tmpFull)

    await sharp(input, { failOn: 'none' })
      .rotate()
      .resize({ width: 640, withoutEnlargement: true })
      .webp({ quality: 70, effort: 4 })
      .toFile(tmpThumb)

    await replaceFile(tmpFull, outWebp)
    await replaceFile(tmpThumb, outThumb)
  } catch (err) {
    await fs.unlink(tmpFull).catch(() => {})
    await fs.unlink(tmpThumb).catch(() => {})
    
    const existing = await fs.stat(outWebp).catch(() => null)
    if (existing && existing.size > 0) {
      console.warn(` (kept existing ${base}.webp)`)
      const outMeta = await sharp(outWebp).metadata().catch(() => ({}))
      const date = await resolveMediaDate(input, name)
      return {
        name: base,
        kind: 'image',
        src: `${pub}/${base}.webp`,
        thumbnail: `${pub}/${base}-thumb.webp`,
        width: outMeta.width ?? null,
        height: outMeta.height ?? null,
        date,
      }
    }
    throw err
  }

  const outMeta = await sharp(outWebp).metadata()
  const date = await resolveMediaDate(input, name)

  return {
    name: base,
    kind: 'image',
    src: `${pub}/${base}.webp`,
    thumbnail: `${pub}/${base}-thumb.webp`,
    width: outMeta.width ?? null,
    height: outMeta.height ?? null,
    date,
  }
}

async function processVideo(dir, folder, name) {
  const input = path.join(dir, name)
  const base = safeStem(name)
  const loopName = `${base}-loop5.mp4`
  const outLoop = path.join(dir, loopName)
  const thumbName = `${base}-thumb.webp`
  const outThumb = path.join(dir, thumbName)

  let srcName = name

  if (hasFfmpeg) {
    const fresh = await fileFresh(outLoop, input)
    if (!fresh) {
      const tmp = path.join(os.tmpdir(), `tdp-${base}-${Date.now()}-loop5.mp4`)
      try {
        await execFileAsync(
          'ffmpeg',
          [
            '-y',
            '-i',
            input,
            '-t',
            String(VIDEO_LOOP_SEC),
            '-an',
            '-vf',
            'scale=min(1280\\,iw):-2',
            '-c:v',
            'libx264',
            '-preset',
            'veryfast',
            '-crf',
            '28',
            '-movflags',
            '+faststart',
            tmp,
          ],
          { windowsHide: true, maxBuffer: 8 * 1024 * 1024 },
        )
        await replaceFile(tmp, outLoop)
      } catch (err) {
        await fs.unlink(tmp).catch(() => {})
        if (!(await fs.stat(outLoop).catch(() => null))) {
          console.warn(` (ffmpeg trim skipped: ${String(err?.message || err).split('\n')[0]})`)
        }
      }
    }
    if (await fs.stat(outLoop).catch(() => null)) {
      srcName = loopName
    }
  }

  if (sharp && hasFfmpeg && !(await fileFresh(outThumb, input))) {
    const posterTmp = path.join(os.tmpdir(), `tdp-${base}-poster-${Date.now()}.jpg`)
    try {
      await execFileAsync(
        'ffmpeg',
        ['-y', '-i', path.join(dir, srcName), '-frames:v', '1', '-q:v', '3', posterTmp],
        { windowsHide: true },
      )
      const thumbTmp = path.join(os.tmpdir(), `tdp-${base}-thumb-${Date.now()}.webp`)
      await sharp(posterTmp, { failOn: 'none' })
        .rotate()
        .resize({ width: 640, withoutEnlargement: true })
        .webp({ quality: 70, effort: 4 })
        .toFile(thumbTmp)
      await replaceFile(thumbTmp, outThumb)
    } catch {
      
    } finally {
      await fs.unlink(posterTmp).catch(() => {})
    }
  }

  const thumbExists = await fs
    .access(outThumb)
    .then(() => true)
    .catch(() => false)

  const date = await resolveMediaDate(input, name)

  return {
    name: base,
    kind: 'video',
    src: `/images/sets/${folder}/${srcName}`,
    thumbnail: thumbExists
      ? `/images/sets/${folder}/${thumbName}`
      : `/images/sets/${folder}/${srcName}`,
    width: null,
    height: null,
    durationSec: VIDEO_LOOP_SEC,
    date,
  }
}

function sortFiles(files) {
  return [...files].sort((a, b) => {
    if (a.name === 'main') return -1
    if (b.name === 'main') return 1
    return a.name.localeCompare(b.name, undefined, { numeric: true })
  })
}

async function processHomeBackground() {
  await fs.mkdir(homeRoot, { recursive: true })
  const names = await listRawFiles(homeRoot)
  const stills = names.filter((n) => {
    const e = path.extname(n).toLowerCase()
    return IMAGE_EXT.has(e)
  })

  
  const preferred =
    stills.find((n) => safeStem(n) === 'main') ??
    stills.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))[0]

  if (!preferred) {
    await fs.writeFile(
      homeManifestPath,
      JSON.stringify({ generatedAt: new Date().toISOString(), src: null, thumbnail: null }, null, 2),
    )
    console.log('home: no image in public/images/home/ (hero falls back to newest set)')
    return
  }

  process.stdout.write(`home/${preferred}... `)
  try {
    const entry = await processStill(homeRoot, 'home', preferred)
    await fs.writeFile(
      homeManifestPath,
      JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          src: entry.src,
          thumbnail: entry.thumbnail,
        },
        null,
        2,
      ),
    )
    console.log('ok')
  } catch (err) {
    console.log('fail')
    console.error(err)
    await fs.writeFile(
      homeManifestPath,
      JSON.stringify({ generatedAt: new Date().toISOString(), src: null, thumbnail: null }, null, 2),
    )
  }
}

async function main() {
  await fs.mkdir(setsRoot, { recursive: true })
  const folders = await listSetFolders()
  const sets = {}

  for (const folder of folders) {
    const dir = path.join(setsRoot, folder)
    const names = await listRawFiles(dir)
    const byName = new Map()

    
    const safeWithSource = new Set(
      names
        .filter((n) => {
          const e = path.extname(n).toLowerCase()
          return e !== '.webp' && (IMAGE_EXT.has(e) || VIDEO_EXT.has(e))
        })
        .map((n) => safeStem(n)),
    )

    for (const name of names) {
      const ext = path.extname(name).toLowerCase()
      const base = safeStem(name)

      
      
      if (ext === '.webp' && safeWithSource.has(base)) {
        continue
      }

      process.stdout.write(`sets/${folder}/${name}... `)
      try {
        const entry = VIDEO_EXT.has(ext)
          ? await processVideo(dir, folder, name)
          : await processStill(dir, `sets/${folder}`, name)
        byName.set(entry.name, entry)
        console.log('ok')
      } catch (err) {
        console.log('fail')
        console.error(err)
      }
    }

    const files = sortFiles([...byName.values()])
    if (files.length > 0) {
      sets[folder] = { folder, date: pickSetDate(files), files }
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    sets,
  }

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2))
  console.log(`\nManifest → ${path.relative(root, manifestPath)}`)
  console.log(
    `Sets with media: ${Object.keys(sets).length} / folders: ${folders.length}`,
  )
  console.log(
    `Set ids: ${Object.keys(sets).sort((a, b) => Number(a) - Number(b)).join(', ') || '(none)'}`,
  )

  await processHomeBackground()

  if (!sharp) {
    console.log(
      'Note: originals are linked directly. Install/unblock sharp later for WebP optimization.',
    )
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
