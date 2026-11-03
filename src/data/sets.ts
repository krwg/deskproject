import type {
  GalleryCategory,
  MediaFile,
  MediaSet,
  MediaSetMeta,
  SetPlacement,
} from '@/types'
import { setsMetaOverrides } from './sets.meta'
import { resolveTone } from './tones'
import manifest from './sets.manifest.json'

type ManifestFile = {
  name: string
  kind: 'image' | 'video'
  src: string
  thumbnail: string
  width?: number | null
  height?: number | null
  durationSec?: number | null
}

type ManifestSet = {
  folder: string
  
  date?: string | null
  files: ManifestFile[]
}

type Manifest = {
  generatedAt: string | null
  sets: Record<string, ManifestSet>
}

export const MAX_SET_FOLDERS = 60

const disk = manifest as Manifest

export function numericSetId(id: string): number {
  const n = Number.parseInt(id, 10)
  return Number.isFinite(n) ? n : 0
}

export function padSetId(n: number): string {
  return String(n).padStart(2, '0')
}

export function sortSetsChrono(
  sets: MediaSet[],
  direction: 'asc' | 'desc' = 'asc',
): MediaSet[] {
  return [...sets].sort((a, b) => {
    const d = numericSetId(a.id) - numericSetId(b.id)
    return direction === 'asc' ? d : -d
  })
}

function defaultPlacements(id: string, allIdsSortedAsc: string[]): SetPlacement[] {
  const newest = allIdsSortedAsc[allIdsSortedAsc.length - 1]
  const newestIndex = allIdsSortedAsc.length - 1
  const index = allIdsSortedAsc.indexOf(id)
  const showOn: SetPlacement[] = ['gallery', 'evolution']

  
  if (id === newest) showOn.push('hero')

  
  if (index >= Math.max(0, newestIndex - 5)) showOn.push('home')

  return showOn
}

function defaultCategory(id: string, allIdsSortedAsc: string[]): GalleryCategory {
  const newest = allIdsSortedAsc[allIdsSortedAsc.length - 1]
  const n = numericSetId(id)
  if (id === newest) return 'full-setup'
  if (n <= 4) return 'evolution'
  return 'full-setup'
}

function autoMeta(id: string, allIdsSortedAsc: string[]): MediaSetMeta {
  const override = setsMetaOverrides[id] ?? {}
  const fromDisk = disk.sets[id]?.date ?? null
  return {
    id,
    title: override.title ?? `Entry ${id}`,
    caption: override.caption ?? '',
    
    date: override.date ?? fromDisk,
    category: override.category ?? defaultCategory(id, allIdsSortedAsc),
    showOn: defaultPlacements(id, allIdsSortedAsc),
    evolutionOrder: numericSetId(id),
    aspect: override.aspect ?? '16 / 10',
    span: override.span ?? 'lg',
    tone: resolveTone(id, override.tone),
  }
}

function discoveredIds(): string[] {
  return Object.keys(disk.sets)
    .filter((id) => {
      const n = numericSetId(id)
      return n >= 1 && n <= MAX_SET_FOLDERS && (disk.sets[id]?.files?.length ?? 0) > 0
    })
    .sort((a, b) => numericSetId(a) - numericSetId(b))
}

function toMediaFile(folder: string, file: ManifestFile): MediaFile {
  return {
    id: `${folder}-${file.name}`,
    kind: file.kind,
    src: file.src,
    thumbnail: file.thumbnail,
    awaiting: false,
    width: file.width ?? undefined,
    height: file.height ?? undefined,
    durationSec:
      file.kind === 'video' ? (file.durationSec ?? 5) : null,
  }
}

function buildSet(meta: MediaSetMeta): MediaSet {
  const files = disk.sets[meta.id]?.files ?? []
  const mainEntry = files.find((f) => f.name === 'main') ?? files[0]
  const extras = files.filter((f) => f !== mainEntry && f.name !== 'main')

  const main = mainEntry
    ? toMediaFile(meta.id, mainEntry)
    : {
        id: `${meta.id}-main`,
        kind: 'image' as const,
        src: `/images/sets/${meta.id}/main.webp`,
        thumbnail: `/images/sets/${meta.id}/main-thumb.webp`,
        awaiting: true,
      }

  return {
    ...meta,
    folder: meta.id,
    mainKey: meta.id,
    evolutionOrder: meta.evolutionOrder ?? numericSetId(meta.id),
    main,
    items: extras.map((f) => toMediaFile(meta.id, f)),
    awaiting: !mainEntry || main.awaiting === true,
  }
}

const ids = discoveredIds()

export const mediaSets: MediaSet[] = sortSetsChrono(
  ids.map((id) => buildSet(autoMeta(id, ids))),
  'asc',
)

export const setMap = Object.fromEntries(
  mediaSets.map((s) => [s.id, s]),
) as Record<string, MediaSet>

export function getSet(id: string): MediaSet | undefined {
  return setMap[id]
}

export function getSetsByPlacement(placement: SetPlacement): MediaSet[] {
  return sortSetsChrono(
    mediaSets.filter((s) => s.showOn.includes(placement)),
    'asc',
  )
}

export function getHeroSet(): MediaSet | undefined {
  return sortSetsChrono(
    mediaSets.filter((s) => !s.awaiting),
    'desc',
  )[0]
}

export function getSetByMainKey(_key: string): MediaSet | undefined {
  return getHeroSet()
}

export function getSetMedia(set: MediaSet): MediaFile[] {
  return [set.main, ...set.items]
}

/** Featured Current Setup strip on Home — explicit set order. */
const CURRENT_SETUP_IDS = ['38', '41', '42', '23', '19'] as const

export function getCurrentSetupSets(): MediaSet[] {
  return CURRENT_SETUP_IDS.map((id) => getSet(id)).filter(
    (set): set is MediaSet => Boolean(set && !set.awaiting),
  )
}

export function getGallerySets(): MediaSet[] {
  return mediaSets.filter((s) => !s.awaiting)
}

export function getSetsByCategory(category: GalleryCategory) {
  return sortSetsChrono(
    mediaSets.filter((s) => s.category === category && !s.awaiting),
    'asc',
  )
}

export function flattenMedia(sets: MediaSet[] = mediaSets): MediaFile[] {
  return sets.flatMap(getSetMedia)
}
