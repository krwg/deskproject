import { useMemo, useState } from 'react'
import { GalleryFilters } from '@/components/gallery/GalleryFilters'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { flattenMedia, getGallerySets } from '@/data/sets'
import type { GalleryCategory } from '@/types'
import { padIndex } from '@/utils/assetUrl'
import styles from './Gallery.module.css'

export function GalleryPage() {
  const all = useMemo(() => getGallerySets(), [])
  const [filter, setFilter] = useState<GalleryCategory | 'all'>('all')

  const presentCategories = useMemo(() => {
    const set = new Set(all.map((s) => s.category))
    return Array.from(set)
  }, [all])

  const filterOptions = useMemo(
    () => ['all' as const, ...presentCategories],
    [presentCategories],
  )

  const filtered = useMemo(() => {
    if (filter === 'all') return all
    return all.filter((s) => s.category === filter)
  }, [all, filter])

  const mediaCount = useMemo(() => flattenMedia(filtered).length, [filtered])

  return (
    <div className={styles.page}>
      <div className={styles.rail}>
        <header className={styles.header}>
          <div className={styles.kicker}>GALLERY</div>
          <h1 className={styles.title}>PHOTOGRAPHIC ARCHIVE</h1>
        <p className={styles.lead}>
          Covers only. Click a set to open clarifying frames and short loops —
          each folder is one specimen in the chronological hall.
        </p>
          <div className={styles.count}>
            SETS {padIndex(filtered.length)} / MEDIA {padIndex(mediaCount)}
          </div>
        </header>

        <GalleryFilters
          categories={filterOptions}
          active={filter}
          onChange={setFilter}
        />
      </div>

      <div className={styles.bridge} aria-hidden />

      <GalleryGrid sets={filtered} />
    </div>
  )
}
