export type GalleryCategory =
  | 'full-setup'
  | 'details'
  | 'evolution'
  | 'work-in-progress'

export type MediaKind = 'image' | 'video'

export type MediaFile = {
  id: string
  kind: MediaKind
  src: string
  thumbnail: string
  awaiting?: boolean
  width?: number
  height?: number
  durationSec?: number | null
  caption?: string
}

export type SetPlacement = 'hero' | 'home' | 'gallery' | 'evolution'

export type ImageTone = {
  exposure?: number
  brightness?: number
  contrast?: number
  grayscale?: number
}

export type MediaSetMeta = {
  id: string
  title: string
  caption: string
  date: string | null
  category: GalleryCategory
  showOn: SetPlacement[]
  evolutionOrder?: number | null
  aspect?: string
  span?: 'sm' | 'md' | 'lg' | 'wide' | 'tall'
  tone?: ImageTone
}

export type MediaSet = MediaSetMeta & {
  folder: string
  main: MediaFile
  items: MediaFile[]
  awaiting: boolean
  mainKey?: string
}

export type EvolutionEntry = {
  id: string
  date: string | null
  label: string
  title: string
  description: string
  setId: string
  lane: 'above' | 'below'
}

export type VersionChangeType =
  | 'equipment-added'
  | 'component-replaced'
  | 'layout-changed'
  | 'peripheral-updated'
  | 'lighting-changed'
  | 'other'

export type VersionHistoryEntry = {
  id: string
  date: string | null
  type: VersionChangeType
  title: string
  description: string
  relatedSetIds?: string[]
}

export type NavItem = {
  path: string
  label: string
  index: string
}
