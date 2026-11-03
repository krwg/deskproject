export type GalleryCategory =
  | 'full-setup'
  | 'details'
  | 'evolution'
  | 'work-in-progress'

export type HardwareCategory =
  | 'computer'
  | 'displays'
  | 'audio'
  | 'peripherals'
  | 'accessories'
  | 'furniture'
  | 'lighting'
  | 'custom-projects'

export type HardwareStatus = 'current' | 'retired'

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

export type ImageAsset = MediaFile & {
  category: GalleryCategory
  date: string | null
  caption: string
  evolutionOrder: number | null
  aspect?: string
  span?: 'sm' | 'md' | 'lg' | 'wide' | 'tall'
}

export type EvolutionEntry = {
  id: string
  date: string | null
  label: string
  title: string
  description: string
  
  setId: string
  
  lane: 'above' | 'below'
  beforeAfterPair?: {
    beforeSetId: string
    afterSetId: string
  }
}

export type HardwareSpec = {
  label: string
  value: string
}

export type HardwareItem = {
  id: string
  name: string
  manufacturer: string
  category: HardwareCategory
  status: HardwareStatus
  setId: string | null
  acquired: string | null
  description: string
  specs: HardwareSpec[]
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
  relatedHardwareIds?: string[]
  relatedSetIds?: string[]
}

export type NavItem = {
  path: string
  label: string
  index: string
}
