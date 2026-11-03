import type { GalleryCategory, MediaSetMeta } from '@/types'

export type SetMetaOverride = Partial<
  Pick<
    MediaSetMeta,
    'title' | 'caption' | 'date' | 'category' | 'aspect' | 'span' | 'tone'
  >
>

export const setsMetaOverrides: Record<string, SetMetaOverride> = {
  
  
  
}

export type { GalleryCategory }
